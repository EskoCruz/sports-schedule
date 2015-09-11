/**
 * Created by esko on 9/5/15.
 */
(function () {

	"use strict";

	angular
		.module('sportsAdmin')
		.controller('LeagueHomeController', LeagueHomeController);

	LeagueHomeController.$inject = ['$location', '$stateParams', 'initialData'];

	/* @ngInject */
	function LeagueHomeController($location, $stateParams, initialData) {
		/* jshint validthis: true */
		var vm = this;

		vm.activate = activate;
		vm.active = true;
		vm.go = go;

		activate();

		////////////////

		function activate() {
		}

		function go(path) {
			$location.path('leagues/' + $stateParams.id + '/' + path);
		}
	}

})();
