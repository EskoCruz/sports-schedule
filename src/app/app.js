(function () {
	'use strict';
	var app = angular.module('sportsAdmin', [
		// Angular modules
		//'ngRoute',

		// 3rd Party Modules
		'ui.bootstrap',
		'ui.router'
	]);

	//app.config(['$routeProvider', configRoutes]);
	app.config(['$stateProvider', '$urlRouterProvider', configRoutes]);

	function configRoutes($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'app/home/home.html',
				controller: 'HomeCtrl',
				controllerAs: 'vm'
			})
			.state('leagues', {
				url: '/leagues',
				templateUrl: 'app/leagues/leagues.html',
				controller: 'LeaguesController',
				controllerAs: 'vm',
				resolve: {
					initialData: ['sportsApi', function (sportsApi) {
						return sportsApi.getLeagues();
					}]
				}
			});
			//.when('/leagues/:id/teams', {
			//	templateUrl: 'app/teams/teams.html',
			//	controller: 'TeamsController',
			//	controllerAs: 'vm',
			//	resolve: {
			//		initialData: ['$route', 'sportsApi', function ($route, sportsApi) {
			//			return sportsApi.getTeams($route.current.params.id);
			//		}]
			//	}
			//})
			//.when('/leagues/:id/games', {
			//	templateUrl: 'app/games/games.html',
			//	controller: 'GamesController',
			//	controllerAs: 'vm',
			//	resolve: {
			//		initialData: ['$route', 'gamesInitialDataService', function ($route, gamesInitialDataService) {
			//			return gamesInitialDataService.getData($route.current.params.id);
			//		}]
			//	}
			//})
			//.when('/leagues/:id/league-home', {
			//	templateUrl: 'app/league-home/league-home.html',
			//	controller: 'LeagueHomeController',
			//	controllerAs: 'vm',
			//	resolve: {
			//		initialData: ['$route','sportsApi', function ($route, sportsApi) {
			//			return sportsApi.getLeagues($route.current.params.id);
			//		}]
			//	}
			//});


		$urlRouterProvider.otherwise('/');
	}

	app.run(['$state', function ($state) {
		// Include $route to kick start the router.
	}]);
})();
