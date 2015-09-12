/**
 * Created by esko on 9/4/15.
 */
(function () {

	"use strict";

	angular
		.module('sportsAdmin')
		.controller('TeamsController', TeamsController);

	TeamsController.$inject = ['$modal', '$location', '$stateParams', 'sportsApi', 'initialData', 'dialogsService'];

	/* @ngInject */
	function TeamsController($modal, $location, $stateParams, sportsApi, initialData, dialogs) {
		/* jshint validthis: true */
		var vm = this;

		vm.activate = activate;
		vm.active = true;
		vm.go = go;

		vm.teams = initialData;
		vm.toggleExpand = toggleExpand;
		vm.accordionExpanded = true;

		vm.deleteItem = deleteItem;
		vm.editItem = editItem;

		activate();

		////////////////

		function activate() {
			initializeGroups();
		}

		function deleteItem(id) {
			dialogs.confirm('Delete?', 'Are you sure you want to delete this team?', ['OK', 'Cancel'])
				.then(function () {
					sportsApi.deleteTeam(id).then(function(data) {
						_.remove(vm.teams, { 'id': id });
						initializeGroups();
					});
				});
		}

		function editItem(team) {
			var modalInstance = $modal.open({
				templateUrl: 'app/teams/edit-team.html',
				controller: 'EditTeamController',
				controllerAs: 'vm',
				resolve: {
					data: function () {
						return {
							divisions: _.chain(vm.teams).uniq('divisionName').map('divisionName').value(),
							itemToEdit: team
						};
					}
				}
			});

			modalInstance.result.then(function (result) {
				result.leagueId = $stateParams.id;
				sportsApi.saveTeam(result).then(function (data) {
					if (team) {
						_.assign(team, data);
					} else {
						vm.teams.push(data);
					}
					initializeGroups();
				});
			});
		}

		function go(path) {
			$location.path('leagues/' + $stateParams.id + '/' + path);
			//$state.go('league-games', { id: $stateParams.id });
		}

		function initializeGroups() {
			vm.groups = _.chain(vm.teams)
				.sortBy('name')
				.groupBy('divisionName')
				.pairs()
				.map(function (item) {
					return { divisionName: item[0], teams: item[1], isOpen: true };
				})
				.sortBy('divisionName')
				.value();
		}

		function toggleExpand(expand) {
			_.forEach(vm.groups, function(group) {
				group.isOpen = expand;
			});
		}
	}
})();
