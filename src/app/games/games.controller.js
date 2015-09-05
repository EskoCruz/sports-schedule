/**
 * Created by esko on 9/5/15.
 */
(function () {

	"use strict";

	angular
		.module('sportsAdmin')
		.controller('GamesController', GamesController);

	GamesController.$inject = ['initialData'];

	/* @ngInject */
	function GamesController(initialData) {
		/* jshint validthis: true */
		var vm = this;

		vm.activate = activate;
		//vm.title = 'GamesController';

		activate();

		////////////////

		function activate() {
		}


	}
})();
