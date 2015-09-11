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
			})
			.state('league-teams', {
				url: '/leagues/:id/teams',
				templateUrl: 'app/teams/teams.html',
				controller: 'TeamsController',
				controllerAs: 'vm',
				resolve: {
					initialData: ['$stateParams', 'sportsApi', function ($stateParams, sportsApi) {
						return sportsApi.getTeams($stateParams.id);
					}]
				}
			})
			.state('/league-games', {
				url: '/leagues/:id/games',
				templateUrl: 'app/games/games.html',
				controller: 'GamesController',
				controllerAs: 'vm',
				resolve: {
					initialData: ['$stateParams', 'gamesInitialDataService', function ($stateParams, gamesInitialDataService) {
						return gamesInitialDataService.getData($stateParams.id);
					}]
				}
			})
			.state('league-home', {
				url: '/leagues/:id/league-home',
				templateUrl: 'app/league-home/league-home.html',
				controller: 'LeagueHomeController',
				controllerAs: 'vm',
				resolve: {
					initialData: ['$stateParams','sportsApi', function ($stateParams, sportsApi) {
						return sportsApi.getLeagues($stateParams.id);
					}]
				}
			});


		$urlRouterProvider.otherwise('/');
	}

	app.run(['$state', function ($state) {
		// Include $stateParams to kick start the router.
	}]);
})();
