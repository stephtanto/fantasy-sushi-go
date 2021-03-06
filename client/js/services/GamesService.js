angular
  .module('app')
  .factory('GamesService', Service);

function Service($http) {
  return {
    // GET all games
    get: function () {
      return $http.get('/api/games');
    },

    // GET one game given gameId
    getGame: function (gameId) {
      return $http.get('/api/games/' + gameId);
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
}
