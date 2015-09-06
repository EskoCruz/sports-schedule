(function() {

	'use strict';

	angular
		.module('sportsAdmin')
		.controller('LeaguesController', LeaguesController);

	LeaguesController.$inject = ['$modal', 'initialData', 'sportsApi'];

	/* @ngInject */
	function LeaguesController($modal, initialData, sportsApi) {
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

			var modalInstance = $modal.open({
				templateUrl: 'app/shared/confirm-modal.html',
				controller: 'confirmModalController',
				controllerAs: 'vm',
				resolve: {
					data: function () {
						return {
							title: 'Delete?',
							message: 'Are you sure you want to Delete?',
							buttons: ['OK', 'Cancel']
						};
					}
				},
				size: 'sm'
			});

			modalInstance.result.then(function () {
				sportsApi.deleteLeague(id).then(function(data){
					_.remove(vm.leagues, { 'id': id });
				});
			}, function () {
				console.log('Modal Dismissed');
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
