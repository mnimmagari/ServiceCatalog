var serviceCatalogApp = angular.module('serviceModule', ['ngMaterial','doowb.angular-pusher','pusherConfig','appUserService','appInfoService']);
serviceCatalogApp.controller('serviceCatalogControllerMain', ['$scope','$http','$filter','$routeParams','$location','growl','$rootScope','$mdDialog','Pusher','$timeout','appUserService',
	function ($scope, $http, $filter, $routeParams, $location, growl, $rootScope, $mdDialog, Pusher, $timeout, appUserService) {
//appuserService starts
appUserService.activeUser().then(function(user){

	$scope.mainObject=[];
      $scope.activeUser = user;
      // console.log($scope.activeUser)

      var id = $routeParams.id;
      $scope.mode=(id==null? 'add': 'edit');
      $scope.closeNow =false;

//refresh started
var refresh = function() {
	$http.get("/api/v1/secure/serviceCatalog").success(function(response) {
		$scope.serviceCataloglist = response;
		if ($scope.serviceCataloglist.length === 0) {
			$scope.serviceCataloglist = true; 
		}
          // $scope.serviceCatalog = "";
      });

	switch($scope.mode)    {
		case "add":
		$scope.serviceCatalog = "";
		break;

		case "edit":
		$scope.array=[];
		$http.get('/api/v1/secure/serviceCatalog/' + id).success(function(response){
			$scope.serviceCatalog = response;
			console.log($scope.serviceCatalog);
			if (response.material!= undefined) {
				var array1=[];
				array1=response.material.split(",");
				$scope.array= array1;
			}
		})
	};
}//refresh ended
refresh();

$scope.save = function() {
	// $scope.serviceCatalog.material = $scope.array.toString();

	switch($scope.mode)
	{
		case "add":
		$scope.addserviceCatalog();
		break;

		case "edit":
		$scope.update();
		break;
	}
	$location.path("/serviceCatalog");
}

  //adding new serviceCatalog into the serviceCatalog model
  $scope.addserviceCatalog = function() {
  	$scope.serviceCatalog.postedBy =  $scope.activeUser._id;
  	$scope.serviceCatalog.status= "open";
  	$http.post("/api/v1/secure/serviceCatalog/" , $scope.serviceCatalog).success(function(response) {
  		refresh();
  		$scope.noofserviceCataloglist = false; 
  		growl.info(parse("Added successfully",$scope.serviceCatalog.title));
  	});
  };

  //removing the serviceCatalog from serviceCatalog model
  $scope.remove = function(serviceCatalog) {
  	var name = serviceCatalog.title;
  	$http.delete("/api/v1/secure/serviceCatalog/" + serviceCatalog).success(function(response) {
  		refresh();
  		growl.info(parse("Deleted successfully"));
  	});
  };

//updating serviceCatalog details
$scope.update = function() {
	$http.put("/api/v1/secure/serviceCatalog/" + $scope.serviceCatalog._id, $scope.serviceCatalog).success(function(response) {
		refresh();
	})
};


$scope.cancel = function() {
	$location.path("/serviceCatalog");
}

  //closing the record by clicking on close button
  $scope.deselect = function() {
  	$scope.serviceCatalog = "";
  }

  $scope.removeImageItem = function(index){
  	$scope.array.splice(index, 1);
  };


  $scope.exportExcel=function(){
  	for (var i = 0; i < $scope.serviceCataloglist.length; i++) {               
  		$scope.mainObject.push({
  			Description   : $scope.serviceCataloglist[i].title,
  			IntendedFor   : $scope.serviceCataloglist[i].description,
  			Category      : $scope.serviceCataloglist[i].category,
  			SubCategory   : $scope.serviceCataloglist[i].subCategory,
  			Sizing        : $scope.serviceCataloglist[i].sizing,
  			Turnaround    : $scope.serviceCataloglist[i].turnaround,
  			Price         : $scope.serviceCataloglist[i].price + " USD",               
  			PostedDate    : $filter('date') ($scope.serviceCataloglist[i].postedDate, "yyyy-MM-dd")
  		})            
  	}

  	function arrCleaned(arr) {
  		var cleaned = [];
  		$scope.mainObject.forEach(function(obj) {
  			var unique = true;
  			cleaned.forEach(function(obj2) {
  				if (_.isEqual(obj, obj2)) unique = false;
  			});
  			if (unique) cleaned.push(obj);
  		});
  		return cleaned;
  	}

  	$scope.mainObject= arrCleaned($scope.mainObject);
  	alasql("SELECT * INTO XLSX('ServiceCatalog.xlsx',{headers:true}) FROM ? ",[$scope.mainObject]); 
  }

  $scope.order= function(serviceCatalog,ev){
  	$mdDialog.show({
  		controller: fbackDialog,
  		templateUrl: '/public/mods/serviceCatalog/order/orderconfer.html',
  		locals:{serviceCatalog: serviceCatalog}, 
  		parent: angular.element(document.body),
  		targetEvent: ev,
  		clickOutsideToClose: false
  	})
  }

 // serviceCatalog.status = "ordered";
 $scope.closePop=function(){
 	$scope.closeNow =true;
 }

 $scope.helpRdd= function(serviceCatalog,ev){
 	$mdDialog.show({
 		controller: fbackDialog,
 		templateUrl: '/public/mods/serviceCatalog/order/rddImg.html',
 		locals:{serviceCatalog: serviceCatalog}, 
 		parent: angular.element(document.body),
 		targetEvent: ev,
 		clickOutsideToClose: false
 	})
 }



}) //appuserService ends

}]); //controller Ends




function fbackDialog($scope, $mdDialog,$http,serviceCatalog) {

	$scope.serviceCatalog = serviceCatalog;
	$scope.hide = function() {
		$mdDialog.hide();
	};
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	$scope.answer = function(answer) {
		$mdDialog.hide(answer);
	};
	$scope.orderConf = function(serviceCatalog,remarks){
		serviceCatalog.status = "ordered";
		$scope.saveActions(serviceCatalog);
		$mdDialog.hide();
	}

	$scope.saveActions = function(serviceCatalog) {
		$http.put("/api/v1/secure/serviceCatalog/" + serviceCatalog._id, serviceCatalog).success(function(response) {
		})
	};
}