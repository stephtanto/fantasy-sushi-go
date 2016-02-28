angular
  .module('app')
  .factory('AuthService', Service);

function Service($q, $timeout, $http) {
  // create user variable
  var user = null;

  // return available functions for use in controllers
  return ({
    isLoggedIn: isLoggedIn,
    getUserStatus: getUserStatus,
    login: login,
    logout: logout,
    register: register
  });

  function isLoggedIn() {
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  function getUserStatus() {
    return user;
  }

  function login(username, password) {
    // create a new instance of deferred
    var deferred = $q.defer();

    // send a post request to the server
    $http.post('/user/login', { username: username, password: password })
      .success(function (data, status) {
        if (status === 200 && data.status) {
          user = true;
          deferred.resolve();
        } else {
          user = false;
          deferred.reject();
        }
      })
      .error(function (data) {
        user = false;
        deferred.reject();
      });

    return deferred.promise;
  }

  function logout() {
    // create a new instance of deferred
    var deferred = $q.defer();

    // send a get request to the server
    $http.get('/user/logout')
      .success(function (data) {
        user = false;
        deferred.resolve();
      })
      .error(function (data) {
        user = false;
        deferred.reject();
      });

    return deferred.promise;
  }

  function register(username, password) {
    // create a new instance of deferred
    var deferred = $q.defer();

    // send a post request to the server
    $http.post('/user/register', { username: username, password: password })
      .success(function (data, status) {
        if (status === 200 && data.status) {
          deferred.resolve();
        } else {
          deferred.reject();
        }
      })
      .error(function (data) {
        deferred.reject();
      });

    return deferred.promise;
  }
}
