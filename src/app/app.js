(function () {
	'use strict';
	var app = angular.module('sportsAdmin', [
		// Angular modules
		'ngRoute',

		// 3rd Party Modules
		'ui.bootstrap'
	]);

	app.config(['$routeProvider', configRoutes]);

	function configRoutes($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'app/home/home.html',
				controller: 'HomeCtrl',
				controllerAs: 'vm'
			})
			.when('/leagues', {
				templateUrl: 'app/leagues/leagues.html',
				controller: 'LeaguesController',
				controllerAs: 'vm',
				resolve: {
					initialData: ['sportsApi', function (sportsApi) {
						return sportsApi.getLeagues();
					}]
				}
			})
			.when('/leagues/:id/teams', {
				templateUrl: 'app/teams/teams.html',
				controller: 'TeamsController',
				controllerAs: 'vm',
				resolve: {
					initialData: ['$route', 'sportsApi', function ($route, sportsApi) {
						return sportsApi.getTeams($route.current.params.id);
					}]
				}
			})
			.when('/leagues/:id/games', {
				templateUrl: 'app/games/games.html',
				controller: 'GamesController',
				controllerAs: 'vm',
				resolve: {
					initialData: ['$route', 'sportsApi', function ($route, sportsApi) {
						return sportsApi.getGames($route.current.params.id);
					}]
				}
			})
			.when('/leagues/:id/league-home', {
				templateUrl: 'app/league-home/league-home.html',
				controller: 'LeagueHomeController',
				controllerAs: 'vm',
				resolve: {
					initialData: ['$route','sportsApi', function ($route, sportsApi) {
						return sportsApi.getLeagues($route.current.params.id);
					}]
				}
			});


		$routeProvider.otherwise('/');
	}

	app.run(['$route', function ($route) {
		// Include $route to kick start the router.
	}]);
})();
