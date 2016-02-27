angular
  .module('app')
  .factory('StatsService', Service);

function Service($http) {
  return {
    // GET all stats
    get: function () {
      return $http.get('/api/stats');
    },

    // GET one stat given playerId
    getPlayerStats: function (playerId) {
      return $http.get('/api/stats/' + playerId);
    },

    // POST and create a new stat
    create: function (statData) {
      return $http.post('/api/stats', statData);
    },

    // DELETE stats
    delete: function (id) {
      return $http.delete('/api/stats/' + id);
    }
  };
}
