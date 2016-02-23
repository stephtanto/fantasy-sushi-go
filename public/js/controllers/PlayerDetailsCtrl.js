app.controller('PlayerDetailsCtrl', ['$scope', 'StatsService', '$routeParams', 'MatchesService', 'GamesService', 'PlayersService',
  function ($scope, StatsService, $routeParams, MatchesService, GamesService,PlayersService) {

    StatsService.get().then(function (response) {
      $scope.stats = response.data;
    });

    var playerId = $routeParams.id;
    PlayersService.getPlayer(playerId).then(function (response) {
      $scope.player = response.data.name;
      console.log('player name',$scope.player);
    });

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
