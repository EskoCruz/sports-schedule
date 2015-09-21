/**
 * Created by esko on 9/5/15.
 */
(function () {

	"use strict";

	angular
		.module('sportsAdmin')
		.controller('LeagueHomeController', LeagueHomeController);

	LeagueHomeController.$inject = ['initialData'];

	/* @ngInject */
	function LeagueHomeController(initialData) {
		/* jshint validthis: true */
		var vm = this;

		vm.activate = activate;

		activate();

		////////////////

		function activate() {
		}

	}

})();
