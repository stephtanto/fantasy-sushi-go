angular
  .module('app', ['ngRoute', 'ngProgress'])
  .config(config)
  .run(run);

function config($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'MainCtrl'
    })
    .when('/games', {
      templateUrl: 'partials/games.html',
      controller: 'GamesCtrl'
    })
    .when('/players', {
      templateUrl: 'partials/players.html',
      controller: 'PlayersCtrl'
    })
    .when('/players/:id', {
      templateUrl: 'partials/playerdetails.html',
      controller: 'PlayerDetailsCtrl'
    })
    .when('/admin', {
      templateUrl: 'partials/admin.html',
      controller: 'AdminCtrl'
    });
}

function run($rootScope, ngProgressFactory) {
  $rootScope.progressbar = ngProgressFactory.createInstance();
  $rootScope.progressbar.setColor('#fff');

  $rootScope.$on('$routeChangeStart', function () {
    $rootScope.progressbar.start();
  });

  $rootScope.$on('$routeChangeSuccess', function () {
    $rootScope.progressbar.complete();
  });
}
