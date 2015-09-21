/**
 * Created by esko on 9/8/15.
 */
(function () {

	"use strict";

	angular
		.module('sportsAdmin')
		.factory('gamesInitialDataService', gamesInitialDataService);

	gamesInitialDataService.$inject = ['sportsApi', '$q'];

	/* @ngInject */
	function gamesInitialDataService(sportsApi, $q) {
		var service = {
			getData: getData
		};

		return service;

		////////////////

		function getData(leagueId) {
			return $q.all([
				sportsApi.getTeams(leagueId),
				sportsApi.getGames(leagueId),
				sportsApi.getLocations()
			]).then(function (results) {
				return {
					teams: results[0],
					games: results[1],
					locations: results[2]
				};
			});
		}

	}


})();
