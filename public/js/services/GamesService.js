app.factory('GamesService', ['$http', function ($http) {
  return {
    // GET all games
    get: function () {
      return $http.get('/api/games');
    },

    // POST and create a new game
    create: function (gameData) {
      return $http.post('/api/games', gameData);
    },

    // DELETE a game
    delete: function (id) {
      return $http.delete('/api/games/' + id);
    },

    // MODIFY a game
    modify: function (id, gameData) {
      return $http.put('/api/games/' + id, gameData);
    }
  };
}]);
