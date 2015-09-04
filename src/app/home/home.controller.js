(function () {
	'use strict';

	angular.module('sportsAdmin').controller('HomeCtrl', HomeCtrl);

	/* @ngInject */
	function HomeCtrl() {
		/* jshint validthis: true */
		var vm = this;

		vm.activate = activate;
		vm.notesCollapsed = true;

		activate();

		////////////////

		function activate() {
		}



	}
})();
