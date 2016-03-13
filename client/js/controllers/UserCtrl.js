// Login

angular
  .module('app')
  .controller('LoginCtrl', LoginController);

function LoginController($rootScope, $scope, $location, AuthService) {
  $scope.login = function () {
    $scope.error = false;
    $scope.disabled = true;

    AuthService.login($scope.loginForm.username, $scope.loginForm.password)
      .then(function () {
        var urlParams = $location.search();

        $location.url(urlParams.redirect ? urlParams.redirect : '/admin');
        $scope.disabled = false;
        $scope.loginForm = {};
        $rootScope.loggedIn = true;
      })
      .catch(function () {
        $scope.error = true;
        $scope.errorMessage = 'Invalid username and/or password';
        $scope.disabled = false;
        $scope.loginForm = {};
      });
  };
}

// Logout

angular
  .module('app')
  .controller('LogoutCtrl', LogoutController);

function LogoutController($rootScope, $scope, $location, AuthService) {
  $scope.logout = function () {
    AuthService.logout().then(function () {
      $location.path('/login');
      $rootScope.loggedIn = false;
    });
  };
}

// Register

angular
  .module('app')
  .controller('RegisterCtrl', RegisterController);

function RegisterController($scope, $location, AuthService) {
  $scope.register = function () {
    $scope.error = false;
    $scope.disabled = true;

    AuthService.register($scope.registerForm.username, $scope.registerForm.password)
      .then(function () {
        $location.path('/login');
        $scope.disabled = false;
        $scope.registerForm = {};
      })
      .catch(function () {
        $scope.error = true;
        $scope.errorMessage = 'Something went wrong!';
        $scope.disabled = false;
        $scope.registerForm = {};
      });
  };
}
