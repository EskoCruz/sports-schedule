/**
 * Created by esko on 9/10/15.
 */
(function () {

	"use strict";

	angular
		.module('sportsAdmin')
		.controller('EditGameController', EditGameController);

	EditGameController.$inject = ['$modalInstance', 'data'];

	/* @ngInject */
	function EditGameController($modalInstance, data) {
		/* jshint validthis: true */
		var vm = this;

		vm.activate = activate;
		vm.save = save;
		vm.cancel = cancel;

		vm.properties = data;
		vm.editableItem = angular.copy(data.itemToEdit);
		vm.title = (data.itemToEdit ? 'Edit Game' : 'Add New Game');

		vm.open = openDatePicker;
		vm.opened = false;
		vm.gameDate = {};
		vm.gameTime = {};


		activate();

		////////////////

		function activate() {
			if (data.itemToEdit) {
				vm.gameDate = data.itemToEdit.time;
				vm.gameTime = moment(data.itemToEdit.time).toDate();
			} else {
				vm.gameDate = moment().format('MM/DD/YYYY');
				vm.gameTime = moment('18:00', 'HH:mm').toDate();
			}
		}

		function openDatePicker($event) {
			$event.preventDefault();
			$event.stopPropagation();
			vm.opened = true;
		}

		function combine(date, time) {
			var dateString = moment(date).format('MM/DD/YYYY');
			return moment(dateString + ' ' + moment(time).format('HH:mm')).format('YYYY-MM-DDTHH:mm:00');
		}

		function cancel() {
			$modalInstance.dismiss();
		}

		function save() {
			vm.editableItem.time = combine(vm.gameDate, vm.gameTime);
			$modalInstance.close(vm.editableItem);
		}

	}

})();
