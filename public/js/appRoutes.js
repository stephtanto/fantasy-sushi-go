app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainCtrl'
        })
        .when('/games', {
            templateUrl: 'views/games.html',
            controller: 'GamesCtrl'
        })
        .when('/players', {
            templateUrl: 'views/players.html',
            controller: 'PlayersCtrl'
        })
        .when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'AdminCtrl'
        });
}]);
