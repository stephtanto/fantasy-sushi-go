angular
  .module('app')
  .factory('PlayersService', Service);

function Service($http) {
  return {
    // GET all players
    get: function () {
      return $http.get('/api/players');
    },

    // GET one stat given playerId
    getPlayer: function (playerId) {
      return $http.get('/api/players/' + playerId);
    },

    // POST and create a new player
    create: function (playerData) {
      return $http.post('/api/players', playerData);
    },

    // DELETE a player
    delete: function (id) {
      return $http.delete('/api/players/' + id);
    },

    // MODIFY a player
    modify: function (id, playerData) {
      return $http.put('/api/players/' + id, playerData);
    },

    // ADD PLAYER STATISTICS
    addGame: function () {
      return $http.post('/api/addGame', gameData);
    }
  };
}
