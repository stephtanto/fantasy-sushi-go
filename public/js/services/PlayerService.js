angular.module('PlayerService', []).factory('Player', ['$http', function ($http) {
	return {
        // call to GET all players
		get : function() {
            return $http.get('/api/getPlayers');
        },

        // call to POST and create a new player
        create : function(playerData) {
            return $http.post('/api/addPlayer', playerData);
        },

        // call to DELETE a player
        delete : function(id) {
            return $http.delete('/api/deletePlayer/' + id);
        },

        // call to MODIFY a player
        modify : function(id, playerData) {
            return $http.put('/api/modifyPlayer/' + id, playerData);
        },

        // call to ADD PLAYER STATISTICS
        addGame : function(){
            return $http.post('/api/addGame', gameData);
        }
    }
}]);
