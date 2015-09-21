/**
 * Created by esko on 9/14/15.
 */
angular
	.module('sportsAdmin')
	.controller('LeagueShellController', LeagueShellController);

LeagueShellController.$inject = ['$state', '$stateParams'];

/* @ngInject */
function LeagueShellController($state, $stateParams) {
	/* jshint validthis: true */
	var vm = this;

	vm.activate = activate;
	vm.leagueId = $stateParams.leagueId;

	activate();

	////////////////

	function activate() {
		_.each(vm.tabs, function (tab) {
			tab.active = ($state.current.name == tab.state);
		});
	}

	vm.tabs = [
		{text: 'Teams', state: 'league.teams'},
		{text: 'Games', state: 'league.games'},
		{text: 'Games Calendar', state: 'league.games-calendar'},
		{text: 'League Home', state: 'league.home'}
	];

}
