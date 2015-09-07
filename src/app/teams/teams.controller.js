/**
 * Created by esko on 9/4/15.
 */
(function () {

	"use strict";

	angular
		.module('sportsAdmin')
		.controller('TeamsController', TeamsController);

	TeamsController.$inject = ['$location', '$routeParams', 'initialData'];

	/* @ngInject */
	function TeamsController($location, $routeParams, initialData) {
		/* jshint validthis: true */
		var vm = this;

		vm.activate = activate;
		vm.go = go;

		vm.teams = initialData;

		activate();

		////////////////

		function activate() {
			initializeGroups();
		}

		function go(path) {
			$location.path('leagues/' + $routeParams.id + '/' + path);
		}

		function initializeGroups() {
			vm.groups = _.chain(vm.teams)
				.sortBy('name')
				.groupBy('divisionName')
				.pairs()
				.map(function (item) {
					return { divisionName: item[0], teams: item[1], isOpen: true };
				})
				.sortBy('divisionName')
				.value();
		}
	}
})();
