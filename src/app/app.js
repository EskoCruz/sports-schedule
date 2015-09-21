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
				controller: 'HomeController',
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
			.state('league', {
				url: '/leagues/:leagueId',
				abstract: true,
				templateUrl: 'app/layout/league-shell.html',
				controller: 'LeagueShellController',
				controllerAs: 'vm'
			})
			.state('league.teams', {
				url: '/teams',
				views: {
					tabContent: {
						templateUrl: 'app/teams/teams.html',
						controller: 'TeamsController',
						controllerAs: 'vm',
						resolve: {
							initialData: ['$stateParams', 'sportsApi', function ($stateParams, sportsApi) {
								return sportsApi.getTeams($stateParams.leagueId);
							}]
						}
					}
				}
			})
			.state('league.games', {
				url: '/games',
				views: {
					tabContent: {
						templateUrl: 'app/games/games.html',
						controller: 'GamesController',
						controllerAs: 'vm',
						resolve: {
							initialData: ['$stateParams', 'gamesInitialDataService', function ($stateParams, gamesInitialDataService) {
								return gamesInitialDataService.getData($stateParams.leagueId);
							}]
						}
					}
				}

			})
			.state('league.home', {
				url: '/league-home',
				views: {
					tabContent: {
						templateUrl: 'app/league-home/league-home.html',
						controller: 'LeagueHomeController',
						controllerAs: 'vm',
						resolve: {
							initialData: ['$stateParams','sportsApi', function ($stateParams, sportsApi) {
								return sportsApi.getLeagues($stateParams.leagueId);
							}]
						}
					}
				}

			});


		$urlRouterProvider.otherwise('/');
	}

	app.run(['$state', 'stateWatcherService', function ($state, stateWatcherService) {
		// Include $route to kick start the router.
	}]);
})();
