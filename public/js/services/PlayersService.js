app.factory('PlayersService', ['$http', function ($http) {
	return {
        // GET all players
		get : function () {
            return $http.get('/api/getPlayers');
        },

        // POST and create a new player
        create : function (playerData) {
            return $http.post('/api/addPlayer', playerData);
        },

        // DELETE a player
        delete : function (id) {
            return $http.delete('/api/deletePlayer/' + id);
        },

        // MODIFY a player
        modify : function (id, playerData) {
            return $http.put('/api/modifyPlayer/' + id, playerData);
        },

        // ADD PLAYER STATISTICS
        addGame : function () {
            return $http.post('/api/addGame', gameData);
        }
    };
}]);
