app.factory('MatchesService', ['$http', function ($http) {
  return {
    // GET all players
    get: function () {
      return $http.get('/api/match');
    },

    // GET one stat given playerId
    getMatch: function (matchId) {
      return $http.get('/api/match/' + matchId);
    },

    // POST and create a new match
    create: function (matchData) {
      return $http.post('/api/match', matchData);
    },

    // DELETE a match
    delete: function (id) {
      return $http.delete('/api/match/' + id);
    },

    // MODIFY a game
    modify: function (id, matchData) {
      return $http.put('/api/match/' + id, matchData);
    }
  };
}]);
