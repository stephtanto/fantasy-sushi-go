app.factory('GamesService', ['$http', function ($http) {
    return {
        // GET all games
        get : function () {
            return $http.get('/api/getGames');
        }
    };
}]);
