/**
 * Created by esko on 9/6/15.
 */
(function () {
	angular
		.module('sportsAdmin')
		.controller('confirmModalController', confirmModalController);

	confirmModalController.$inject = ['$modalInstance', 'data'];

	/* @ngInject */
	function confirmModalController($modalInstance, data) {
		/* jshint validthis: true */
		var vm = this;

		vm.ok = ok;
		vm.cancel = cancel;
		vm.properties = data;



		////////////////

		function ok() {
			$modalInstance.close();
		}

		function cancel() {
			$modalInstance.dismiss();
		}

	}
})();
