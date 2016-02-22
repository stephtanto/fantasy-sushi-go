app.factory('MatchsService', ['$http', function ($http) {
	return {
        // GET all players
		get: function () {
            return $http.get('/api/match');
        },

        // POST and create a new match
        create: function (matchData) {
            console.log('match data', matchData);
            return $http.post('/api/match', matchData);
        },
        // DELETE a match
        delete: function (id) {
            return $http.delete('/api/match/' + id);
        },

        // MODIFY a game
        modify: function (id, matchData) {
            console.log('MATCCHH',matchData);
            return $http.put('/api/match/' + id, matchData);
        }
    };
}]);
