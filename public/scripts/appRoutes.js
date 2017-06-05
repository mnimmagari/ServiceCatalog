angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider


	.when('/serviceCatalog', {
		templateUrl: 'views/serviceCatalog.html',
		controller: 'serviceCatalogControllerMain'	
	})
	.when('/serviceCatalog/:id/view', {
		templateUrl: 'views/serviceCatalogViewDetail.html',
		controller: 'serviceCatalogControllerMain'
	})  
	.when('/serviceCatalog/add', {
		templateUrl: 'views/serviceCatalogDesAdd.html',
		controller: 'serviceCatalogControllerMain'
	})

	.when('/serviceCatalog/:id/project/edit', {
		templateUrl: 'views/serviceCatalogDesAdd.html',
		controller: 'serviceCatalogControllerMain'
	})  ;

	$locationProvider.html5Mode(true);

}]);