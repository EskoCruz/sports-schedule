/**
 * Created by esko on 9/5/15.
 */
(function () {

	"use strict";

	angular
		.module('sportsAdmin')
		.controller('GamesController', GamesController);

	GamesController.$inject = ['$modal', '$stateParams', 'initialData', 'dialogsService', 'sportsApi', 'uiCalendarConfig'];

	/* @ngInject */
	function GamesController($modal, $stateParams, initialData, dialogs, sportsApi, uiCalendarConfig) {
		/* jshint validthis: true */
		var vm = this;

		vm.activate = activate;
		vm.games = initialData.games;
		vm.teams = initialData.teams;
		vm.locations = initialData.locations;
		vm.teamsLookup = {};
		vm.locationsLookup = {};

		vm.deleteItem = deleteItem;
		vm.editItem = editItem;

		vm.calendarConfig = {
			height: 550,
			header: {
				left: 'month agendaWeek agendaDay',
				center: 'title',
				right: 'today prev,next'
			},
			defaultView: 'agendaDay',
			scrollTime: '08:00:00',
			dayClick: dayClick,
			editable: true,
			eventClick: eventClick
		};

		activate();

		////////////////

		function eventClick(calEvent) {
			var game = _.find(vm.games, { 'id': calEvent.id });
			editItem(game);
		}

		function dayClick(date) {
			uiCalendarConfig.calendars.gamesCalendar.fullCalendar('changeView', 'agendaDay');
			uiCalendarConfig.calendars.gamesCalendar.fullCalendar('gotoDate', date);
		}

		function activate() {
			_.forEach(vm.teams, function (team) {
				vm.teamsLookup[team.id] = team.name;
			});
			_.forEach(vm.locations, function (location) {
				vm.locationsLookup[location.id] = location.name;
			});

			var gameEvents = _.map(vm.games, mapToGameEvent);
			vm.eventSources = [gameEvents];
		}

		function mapToGameEvent(game) {
			return {
				id: game.id,
				start: game.time,
				title: vm.teamsLookup[game.team1Id] + ' vs. ' + vm.teamsLookup[game.team2Id],
				allDay: false,
				durationEditable: false,
				end: moment(game.time).add(1, 'hour').toDate()
			};
		}

		function deleteItem(id) {
			dialogs.confirm('Delete?', 'Delete this game?', ['OK', 'Cancel'])
				.then(function () {
					sportsApi.deleteGame(id).then(function (data) {
						_.remove(vm.games, { 'id': id });
					});
				});
		}

		function editItem(game) {
			var modalInstance = $modal.open({
				templateUrl: 'app/games/edit-game.html',
				controller: 'EditGameController',
				controllerAs: 'vm',
				resolve: {
					data: function () {
						return {
							locations: _.sortBy(vm.locations, 'name'),
							teams: _.sortBy(vm.teams, 'divisionName, name'),
							itemToEdit: game
						};
					}
				}
			});

			modalInstance.result.then(function (result) {
				result.leagueId = $stateParams.id;
				sportsApi.saveGame(result).then(function (data) {
					if (game) {
						_.assign(game, data);
						var index = _.findIndex(vm.eventSources[0], { 'id': data.id });
						vm.eventSources[0][index] = mapToGameEvent(data);
					} else {
						vm.games.push(data);
						vm.gameEvents.push(mapToGameEvent(data))
					}
				});
			});
		}

	}
})();
