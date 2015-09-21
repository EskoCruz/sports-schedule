/**
 * Created by esko on 9/21/15.
 */
(function () {

	"use strict";

	angular
		.module('sportsAdmin')
		.factory('stateWatcherService', stateWatcherService);

	stateWatcherService.$inject = ['$rootScope'];

	/* @ngInject */
	function stateWatcherService($rootScope) {

		$rootScope.$on('$stateChangeStart', stateChangeStart);
		$rootScope.$on('$stateChangeSuccess', stateChangeSuccess);
		$rootScope.$on('$stateChangeError', stateChangeError);
		$rootScope.$on('$stateNotFound', stateNotFound);


		function stateChangeStart(event, toState, toParams, fromState, fromParams) {
			console.log('state change start', event, toState, toParams, fromState, fromParams);
		}

		function stateChangeSuccess(event, toState, toParams, fromState, fromParams) {
			console.log('state change success', event, toState, toParams, fromState, fromParams);
		}

		function stateChangeError(event, toState, toParams, fromState, fromParams) {
			console.log('state change error', event, toState, toParams, fromState, fromParams);
		}

		function stateNotFound(event, toState, toParams, fromState, fromParams) {
			console.log('state not found', event, toState, toParams, fromState, fromParams);
		}

		////////////////

		var service = {};

		return service;


	}


})();
