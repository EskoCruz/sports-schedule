(function () {
	'use strict';

	angular.module('sportsAdmin').controller('HomeController', HomeController);

	/* @ngInject */
	function HomeController() {
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
