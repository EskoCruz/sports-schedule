/**
 * Created by esko on 9/4/15.
 */
(function () {

	"use strict";

	angular
		.module('sportsAdmin')
		.controller('TeamsController', TeamsController);

	TeamsController.$inject = ['initialData'];

	/* @ngInject */
	function TeamsController(initialData) {
		/* jshint validthis: true */
		var vm = this;

		vm.activate = activate;
		//vm.title = 'TeamsController';

		activate();

		////////////////

		function activate() {
		}


	}
})();
