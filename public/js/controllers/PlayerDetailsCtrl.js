app.controller('PlayerDetailsCtrl', ['$scope', '$routeParams',
  'StatsService', 'MatchesService', 'GamesService', 'PlayersService',
  function ($scope, $routeParams, StatsService, MatchesService, GamesService, PlayersService) {

    StatsService.get().then(function (response) {
      $scope.stats = response.data;
    });

    var playerId = $routeParams.id;

    PlayersService.getPlayer(playerId).then(function (response) {
      $scope.player = response.data;
    });

    $scope.statInformation = [];

    StatsService.getPlayerStats(playerId).then(function (response) {
      var stats = response.data;

      for (s in stats) {
        // Get Match Information
        MatchesService.getMatch(stats[s].matchId).then(function (response) {
          var match = response.data;

          GamesService.getGame(match.gameId).then(function (response) {
            var temp = {
              stat: stats[s],
              match: match,
              game: response.data
            };

            $scope.statInformation.push(temp);
          });
        });
      }
    });
  }]);
