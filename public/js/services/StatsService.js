app.factory('StatsService', ['$http', function ($http) {
    return {
        // GET all games
        get: function () {
            return $http.get('/api/stats');
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
}]);
