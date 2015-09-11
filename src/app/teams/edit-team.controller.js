/**
 * Created by esko on 9/7/15.
 */
angular
	.module('sportsAdmin')
	.controller('EditTeamController', EditTeamController);

EditTeamController.$inject = ['$modalInstance', 'data'];

/* @ngInject */
function EditTeamController($modalInstance, data) {
	/* jshint validthis: true */
	var vm = this;

	vm.activate = activate;
	vm.cancel = cancel;
	vm.save = save;

	vm.properties = data;
	vm.editableItem = angular.copy(data.itemToEdit);
	vm.title = (data.itemToEdit ? 'Edit Team' : 'Add New Team');

	activate();

	////////////////

	function activate() {
	}



	function cancel() {
		$modalInstance.dismiss();
	}

	function save() {
		$modalInstance.close(vm.editableItem);
	}

}
