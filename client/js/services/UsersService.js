angular
  .module('app')
  .factory('UsersService', Service);

function Service($http) {
  return {
    // GET all users
    get: function () {
      return $http.get('/api/users');
    },

    // MODIFY a user
    modify: function (id, userData) {
      return $http.put('/api/users/' + id, userData);
    }
  };
}
