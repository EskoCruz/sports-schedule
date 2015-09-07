/**
 * Created by esko on 9/6/15.
 */
(function () {

	"use strict";

	angular
		.module('sportsAdmin')
		.controller('ConfirmModalController', ConfirmModalController);

	ConfirmModalController.$inject = ['$modalInstance', 'data'];

	/* @ngInject */
	function ConfirmModalController($modalInstance, data) {
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
