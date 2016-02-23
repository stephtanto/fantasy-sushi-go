app.controller('PlayerDetailsCtrl', ['$scope', 'StatsService', '$routeParams', 'MatchesService', 'GamesService',
  function ($scope, StatsService, $routeParams, MatchesService, GamesService) {

    StatsService.get().then(function (response) {
      $scope.stats = response.data;
    });

    var playerId = $routeParams.id;

    $scope.statInformation = [];

    StatsService.getPlayerStats(playerId).then(function (response) {
      var stats = response.data;

      for (s in stats) {
        // Get Match Information
        MatchesService.getMatch(stats[s].matchId).then(function (response) {
          var match = response.data;

          // console.log('match', match);

          GamesService.getGame(match.gameId).then(function (response) {
            var temp = {
              stat: stats[s],
              match: match,
              game: response.data
            };

            $scope.statInformation.push(temp);

            // console.log('statInformation', $scope.statInformation);
          });
        });
      }
    });
  }]);
