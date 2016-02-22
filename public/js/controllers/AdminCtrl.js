app.controller('AdminCtrl', ['$scope', 'GamesService', 'PlayersService', 'MatchesService', 'StatsService',
  function ($scope, GamesService, PlayersService, MatchesService, StatsService) {

  // #region Tabs

  $scope.tabs = {
    items: ['Matches', 'Games', 'Players'],
    active: 0
  };

  $scope.changeTab = function (index) {
    $scope.tabs.active = index;
  };

  // #endregion Tabs

  // #region File Upload
  $scope.data = {};

  // TODO: just use a file input in the HTML
  var fileSelect = document.createElement('input');
  fileSelect.type = 'file';

  if (fileSelect.disabled) { //check if browser support input type='file' and stop execution of controller
    return;
  }

  $scope.click = function () { //activate function to begin input file on click
    fileSelect.click();
  };

  fileSelect.onchange = function () {
    var f = fileSelect.files[0],
      r = new FileReader();

    // Callback after files finish loading
    r.onloadend = function (e) {
      $scope.data.b64 = e.target.result;
      $scope.$apply();

      // Replace regex if you want to rip off the base 64 "header"
      console.log($scope.data.b64.replace(/^data:image\/(png|jpg);base64,/, ''));

      // Here you can send data over your server as desired
    };

    r.readAsDataURL(f); //once defined all callbacks, begin reading the file
  };

  // #endregion File Upload

  // #region Init

  $scope.game = {
    _id: '',
    name: ''
  };

  $scope.player = {
    _id: '',
    name: '',
    img: ''
  };

  $scope.stat = {
    name: '',
    game: '',
    date: new Date(),
    players: [],
    matchId: 0,
    _id: ''
  };

  GamesService.get().then(function (response) {
    $scope.games = response.data;
  });

  PlayersService.get().then(function (response) {
    $scope.players = response.data;
  });

  MatchesService.get().then(function (response) {
    $scope.matchs = response.data;
  });

  StatsService.get().then(function (response) {
    $scope.stats = response.data;
  });

  $scope.formType = 'add';

  // #endregion Init

  // Helper Function: used to get next Id, for iterating db
  function getId(array, id) {
    var size = array.length;

    if (size === 0) {
      return 1;
    }

    // Get last player added
    return array[size - 1][id] + 1;
  };

  $scope.addGame = function () {
    var gameId = getId($scope.games, 'gameId');

    var data = {
      name: $scope.game.name,
      gameId: gameId
    };

    GamesService.create(data).then(function () {
      $scope.game.name = '';

      GamesService.get().then(function (response) {
        $scope.games = response.data;
      });
    });
  };

  $scope.editGame = function (game) {
    $scope.formType = 'edit';
    $scope.game = game;
  };

  $scope.modifyGame = function () {
    GamesService.modify($scope.game._id, $scope.game).then(function () {
      $scope.game._id = '';
      $scope.game.name = '';
      $scope.formType = 'add';

      GamesService.get().then(function (response) {
        $scope.games = response.data;
      });
    });
  };

  $scope.deleteGame = function (data) {
    GamesService.delete(data._id).then(function () {
      GamesService.get().then(function (response) {
        $scope.games = response.data;
      });
    });
  };

  $scope.addPlayer = function () {
    $scope.player.img = $scope.data.b64;

    var playerId = getId($scope.players, 'playerId');

    var data = {
      playerId: playerId,
      name: $scope.player.name,
      img: $scope.player.img
    };

    PlayersService.create(data).then(function () {
      // Re-init values
      $scope.player.name = '';
      $scope.player.img = '';

      PlayersService.get().then(function (response) {
        $scope.players = response.data;
      });
    });
  };

  $scope.editPlayer = function (player) {
    $scope.formType = 'edit';
    $scope.player = player;
  };

  $scope.modifyPlayer = function () {
    PlayersService.modify($scope.player._id, $scope.player).then(function () {
      $scope.player._id = '';
      $scope.player.name = '';
      $scope.player.img = '';
      $scope.formType = 'add';

      PlayersService.get().then(function (response) {
        $scope.players = response.data;
      });
    });
  };

  $scope.deletePlayer = function (data) {
    PlayersService.delete(data._id).then(function () {
      PlayersService.get().then(function (response) {
        $scope.players = response.data;
      });
    });
  };

  // Functionality for Matches/Stats
  $scope.addPlayerToStat = function () {
    var id = getId($scope.stat.players, 'id');

    var tempPlayer = {
      id: id,
      playerId: 0,
      points: 0,
      ranking: 0
    };

    $scope.stat.players.push(tempPlayer);
  };

  $scope.deleteStatPlayer = function (player) {
    // Remove player
    for (p in $scope.stat.players) {
      if ($scope.stat.players[p].id === player.id) {
        $scope.stat.players.splice(p, 1);
      }
    }

    // Reorder ids
    for (p in $scope.stat.players) {
      $scope.stat.players[p].id = parseInt(p, 10) + 1;
    }
  };

  $scope.addMatch = function () {
    for (p in $scope.stat.players) {
      $scope.stat.players[p].id = parseInt($scope.stat.players[p].id, 10);
    }

    var matchId = getId($scope.matchs, 'matchId');

    var matchData = {
      name: $scope.stat.name,
      gameId: parseInt($scope.stat.game, 10),
      date: $scope.stat.date,
      matchId: matchId
    };

    var playerData = $scope.stat.players;

    // Add Match
    MatchesService.create(matchData).then(function () {
      $scope.stat = {
        name: '',
        game: '',
        date: new Date(),
        players: [],
        _id: ''
      };

      // Add Stats for each player
      for (p in playerData) {
        var statData = {
          player: playerData[p],
          matchId: matchId
        };

        StatsService.create(statData).then(function () {
          StatsService.get().then(function (response) {
            $scope.stats = response.data;
          });
        });
      }

      MatchesService.get().then(function (response) {
        $scope.matchs = response.data;
      });
    });
  };

  $scope.editMatch = function (data) {
    $scope.formType = 'edit';

    $scope.stat = {
      name: data.name,
      game: '' + data.gameId,
      date: new Date(data.date),
      players: [],
      matchId: data.matchId,
      _id: data._id
    };

    var id = 1;

    for (s in $scope.stats) {
      if ($scope.stats[s].matchId === data.matchId) {
        var tempPlayer = {
          id: id,
          playerId: '' + $scope.stats[s].playerId,
          points: $scope.stats[s].points,
          ranking: $scope.stats[s].ranking
        };

        $scope.stat.players.push(tempPlayer);
        id++;
      }
    }
  };

  $scope.modifyMatch = function () {
    for (p in $scope.stat.players) {
      $scope.stat.players[p].id = parseInt($scope.stat.players[p].id, 10);
    }

    var matchData = {
      name: $scope.stat.name,
      gameId: $scope.stat.game,
      date: $scope.stat.date,
      matchId: $scope.stat.matchId
    };

    var playerData = $scope.stat.players;

    // Add Match

    // Delete all stats associated with that matchid
    StatsService.delete($scope.stat.matchId).then(function () {
      MatchesService.modify($scope.stat._id, matchData).then(function () {
        $scope.stat = {
          name: '',
          game: '',
          date: new Date(),
          players: [],
          matchId: $scope.stat.matchId
        };

        // Add Stats for each player
        for (p in playerData) {
          var statData = {
            player: playerData[p],
            matchId: $scope.stat.matchId
          };

          StatsService.create(statData).then(function () {
            StatsService.get().then(function (response) {
              $scope.stats = response.data;
            });
          });
        }

        MatchesService.get().then(function (response) {
          $scope.matchs = response.data;
        });
      });
    });
  };

  $scope.deleteMatch = function (data) {
    MatchesService.delete(data._id).then(function () {
      MatchesService.get().then(function (response) {
        $scope.matchs = response.data;
      });
    });

    StatsService.delete(data.matchId).then(function () {
      StatsService.get().then(function (response) {
        $scope.stats = response.data;
      });

      $scope.stat = {
        name: '',
        game: '',
        date: new Date(),
        players: [],
        matchId: ''
      };
    });
  };
}]);
