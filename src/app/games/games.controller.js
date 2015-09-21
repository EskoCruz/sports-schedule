/**
 * Created by esko on 9/5/15.
 */
(function () {

	"use strict";

	angular
		.module('sportsAdmin')
		.controller('GamesController', GamesController);

	GamesController.$inject = ['$modal', '$stateParams', 'initialData', 'dialogsService', 'sportsApi'];

	/* @ngInject */
	function GamesController($modal, $stateParams, initialData, dialogs, sportsApi) {
		/* jshint validthis: true */
		var vm = this;

		vm.activate = activate;
		vm.games = initialData.games;
		vm.teams = initialData.teams;
		vm.locations = initialData.locations;
		vm.teamsLookup = {};
		vm.locationsLookup = {};

		vm.deleteItem = deleteItem;
		vm.editItem = editItem;

		activate();

		////////////////

		function activate() {
			_.forEach(vm.teams, function (team) {
				vm.teamsLookup[team.id] = team.name;
			});
			_.forEach(vm.locations, function (location) {
				vm.locationsLookup[location.id] = location.name;
			});
		}

		function deleteItem(id) {
			dialogs.confirm('Delete?', 'Delete this game?', ['OK', 'Cancel'])
				.then(function () {
					sportsApi.deleteGame(id).then(function (data) {
						_.remove(vm.games, { 'id': id });
					});
				});
		}

		function editItem(game) {
			var modalInstance = $modal.open({
				templateUrl: 'app/games/edit-game.html',
				controller: 'EditGameController',
				controllerAs: 'vm',
				resolve: {
					data: function () {
						return {
							locations: _.sortBy(vm.locations, 'name'),
							teams: _.sortBy(vm.teams, 'divisionName, name'),
							itemToEdit: game
						};
					}
				}
			});

			modalInstance.result.then(function (result) {
				result.leagueId = $stateParams.id;
				sportsApi.saveGame(result).then(function (data) {
					if (game) {
						_.assign(game, data);
						//var index = _.findIndex(vm.eventSources[0], { 'id': game.id });
					} else {
						vm.games.push(data);
					}
				});
			});
		}

	}
})();
