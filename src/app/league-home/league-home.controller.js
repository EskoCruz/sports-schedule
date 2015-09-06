/**
 * Created by esko on 9/5/15.
 */
(function () {

	"use strict";

	angular
		.module('sportsAdmin')
		.controller('LeagueHomeController', LeagueHomeController);

	LeagueHomeController.$inject = ['$location', '$routeParams', 'initialData'];

	/* @ngInject */
	function LeagueHomeController($location, $routeParams, initialData) {
		/* jshint validthis: true */
		var vm = this;

		vm.activate = activate;
		vm.go = go;

		activate();

		////////////////

		function activate() {
		}

		function go(path) {
			$location.path('leagues/' + $routeParams.id + '/' + path);
		}
	}

})();
