(function() {

	'use strict';

	angular
		.module('sportsAdmin')
		.controller('LeaguesController', LeaguesController);

	LeaguesController.$inject = ['dialogsService', 'initialData', 'sportsApi'];

	/* @ngInject */
	function LeaguesController(dialogs, initialData, sportsApi) {
		/* jshint validthis: true */
		var vm = this;

		vm.activate = activate;
		vm.leagues = initialData;
		vm.addItem = addItem;
		vm.cancelEdit = cancelEdit;
		vm.editItem = editItem;
		vm.deleteItem = deleteItem;
		vm.saveItem = saveItem;
		vm.currentEdit = {};
		vm.itemToEdit = {};
		vm.hideAlert = hideAlert;
		vm.showHelpAlert = true;

		activate();

		////////////////

		function activate() {
		}

		function addItem() {
			var newLeague = {
				name: vm.newLeagueName
			};

			sportsApi.addLeague(newLeague).then(function(data) {
				vm.newLeagueName = '';
				vm.leagues.push(data);
			});
		}

		function cancelEdit(id) {
			vm.currentEdit[id] = false;
		}

		function deleteItem(id) {
			dialogs.confirm('Delete?', 'Are you sure you want to delete this league?', ['OK', 'Cancel'])
				.then(function () {
					sportsApi.deleteLeague(id).then(function (data) {
						_.remove(vm.leagues, {'id': id});
					});
				});
		}

		function editItem(item) {
			vm.currentEdit[item.id] = true;
			vm.itemToEdit = angular.copy(item);

		}

		function hideAlert() {
			vm.showHelpAlert = false;
		}

		function saveItem(item) {
			sportsApi.saveLeague(vm.itemToEdit).then(function(data) {
				vm.currentEdit[item.id] = false;
				item.name = vm.itemToEdit.name;
			});
		}

	}
})();
