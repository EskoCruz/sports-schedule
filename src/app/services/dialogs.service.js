/**
 * Created by esko on 9/6/15.
 */
(function () {
	angular
		.module('sportsAdmin')
		.factory('dialogsService', dialogsService);

	dialogsService.$inject = ['$modal'];

	/* @ngInject */
	function dialogsService($modal) {
		var service = {
			confirm: confirm
		};

		return service;

		////////////////

		function confirm(title, message, buttons) {
			var modalInstance = $modal.open({
				templateUrl: 'app/shared/confirm-modal.html',
				controller: 'ConfirmModalController',
				controllerAs: 'vm',
				resolve: {
					data: function () {
						return {
							title: title,
							message: message,
							buttons: buttons
						};
					}
				},
				size: 'sm'
			});

			return modalInstance.result;
		}


	}

})();
