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
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl'
    })
    .when('/logout', {
      controller: 'LogoutCtrl',
      access: { restricted: true }
    })
    .when('/admin', {
      templateUrl: 'partials/admin.html',
      controller: 'AdminCtrl',
      access: { restricted: true }
    })
    .otherwise({ redirectTo: '/' });
}

function run($rootScope, $location, ngProgressFactory, AuthService) {
  $rootScope.progressbar = ngProgressFactory.createInstance();
  $rootScope.progressbar.setColor('#fff');

  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (next.access && next.access.restricted && !AuthService.isLoggedIn()) {
      $location.path('/login');
    }

    $rootScope.progressbar.start();
  });

  $rootScope.$on('$routeChangeSuccess', function () {
    $rootScope.progressbar.complete();
  });
}
