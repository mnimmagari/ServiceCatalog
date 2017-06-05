angular.module('serviceCatalog', ['ngRoute', 'appRoutes', 'serviceModule','angular-growl','textAngular','ngMessages','ngFileUpload'])
.run(function ($rootScope, $location, $http) {
	// $http.get('/token')
	// .success(function (user, status) {
	// 	if (user) {
	// 		$rootScope.user = user;
	// 	}
	// });
})
.config(['growlProvider', function(growlProvider) {
	growlProvider.globalReversedOrder(true);
	growlProvider.globalTimeToLive({success: 1000, error: 2000, warning: 3000, info: 4000});
	growlProvider.globalDisableCountDown(true);
	growlProvider.globalPosition('top-center');
}]);


var appUser = angular.module('appUserService', []);
var appInfo = angular.module('appInfoService',[]);
var pagination = angular.module('paginationService',[]);
var notify = angular.module('notification',['angular-web-notification']);


notify.directive('showButton', ['webNotification', function (webNotification) {
	return {
		restrict: 'C',
		scope: {
			notificationTitle: '=',
			notificationText: '=',
		},
		link: function (scope, element) {
			webNotification.showNotification(scope.notificationTitle, {
				body: scope.notificationText,
				icon: '/public/uploads/notification/notification.png',
                     // autoClose: 5000 //auto close the notification after 4 seconds (you can manually close it via hide function)
                 }, function onShow(error, hide) {
                 	if (error) {
                 		window.alert('Unable to show notification: ' + error.message);
                 	} else {
                 		setTimeout(function hideNotification() {
                            hide(); //manually close the notification (you can skip this if you use the autoClose option)
                        }, 10000);
                 	}
                 });
            // });
        }
    };
}]);

appUser.factory('appUserService', ['$http', '$q', function ($http, $q){

	var appUserService =  {};

	appUserService.activeUser = function () {

		var defer = $q.defer();

		$http.get('/token',{
			cache: true
		}).success(function(response) {
			
			if(response !== undefined){
				defer.resolve(response);
			}
			else {
				defer.reject("No User Found");
			}
		});

		return defer.promise;
	}

	return appUserService;

}]);

appInfo.factory('appInfoService', ['$http', '$q', function ($http, $q){

	var appInfoService =  {};

	appInfoService.appInfo = function () {

		var defer = $q.defer();

		$http.get('/api/v1/app/info',{
			cache: true
		}).success(function(response) {
			
			if(response !== undefined){
				defer.resolve(response);
			}
			else {
				defer.reject("No User Found");
			}
		});

		return defer.promise;
	}

	appInfoService.appAuth = function() {
		var defer = $q.defer();

		$http.get('/api/v1/secure/app/auth',{
			cache: true
		}).success(function(response) {

			if(response !== undefined){
				defer.resolve(response);
			}
			else {
				defer.reject("No Info Found");
			}
		});

		return defer.promise;
	}

	return appInfoService;

}]);

pagination.factory('PagerService', PagerService)

function PagerService() {
    // service definition
    var service = {};

    service.GetPager = GetPager;

    return service;

    // service implementation
    function GetPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 5
        pageSize = pageSize || 5;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);
        var startPage, endPage;
        if (totalPages <= 5) {
            // less than 5 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 5 total pages so calculate start and end pages
            if (currentPage <= 3) {
            	startPage = 1;
            	endPage = 5;
            } else if (currentPage + 2 >= totalPages) {
            	startPage = totalPages - 4;
            	endPage = totalPages;
            } else {
            	startPage = currentPage - 2;
            	endPage = currentPage + 2;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = _.range(startPage, endPage + 1);

        // return object with all pager properties required by the view
        return {
        	totalItems: totalItems,
        	currentPage: currentPage,
        	pageSize: pageSize,
        	totalPages: totalPages,
        	startPage: startPage,
        	endPage: endPage,
        	startIndex: startIndex,
        	endIndex: endIndex,
        	pages: pages
        };
    }
}