app.factory('GamesService', ['$http', function ($http) {
    return {
        // GET all games
        get : function () {
            return $http.get('/api/getGames');
        },

        // POST and create a new game
        create : function (gameData) {
            return $http.post('/api/addGame', gameData);
        },

        // DELETE a game
        delete : function (id) {
            return $http.delete('/api/deleteGame/' + id);
        },

        // MODIFY a game
        modify : function (id, gameData) {
            return $http.put('/api/modifyGame/' + id, gameData);
        }
    };
}]);
