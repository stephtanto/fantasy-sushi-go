app.controller('PlayersCtrl', ['$scope', 'PlayersService', 'StatsService', '$location',
  function ($scope, PlayersService, StatsService, $location) {

    var calculateStats = function (players, stats) {
      for (p in players) {
        for (s in stats) {
          if (players[p].playerId === stats[s].playerId) {
            if (stats[s].ranking === 1) {
              // Win
              players[p].wins++;
            } else {
              players[p].losses++;
            }

            players[p].points += stats[s].points;
          }
        }
      }

      return calculatePlayerRanking(players);
    };

    var calculatePlayerRanking = function (players) {
      for (p in players) {
        players[p].ranking = players[p].wins - players[p].losses;
      }

      players = players.sort(function (a, b) {
        if (a.ranking === b.ranking) {
          return (a.points > b.points) ? -1 : (a.points < b.points) ? 1 : 0;
        } else {
          return (a.ranking > b.ranking) ? -1 : 1;
        }
      });

      return players;
    };

    PlayersService.get().then(function (response) {
      $scope.players = response.data;

      StatsService.get().then(function (response) {
        $scope.stats = response.data;

        var playerArray = [];

        // Calculate player stats -- done this way so I don't need to pass the pictures to run the stats
        for (p in $scope.players) {
          var temp = {
            playerId: $scope.players[p].playerId,
            name: $scope.players[p].name,
            img: '',
            wins: 0,
            losses: 0,
            points: 0,
            overallRanking: 0,
            ranking: 0
          };

          playerArray.push(temp);
        }

        var playerStats = calculateStats(playerArray, $scope.stats);

        // Update player profiles
        // for (p1 in $scope.players) {
        //   for (p2 in playerStats) {
        //     if ($scope.players[p1].playerId === playerStats[p2].playerId) {
        //       playerStats[p2].img = $scope.players[p1].img;
        //     }
        //   }
        // }

        $scope.playerProfiles = playerStats;
      });
    });
  }]);
