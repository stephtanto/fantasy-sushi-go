angular
  .module('app')
  .controller('GamesCtrl', Controller);

function Controller($scope, GamesService) {
  GamesService.get().then(function (response) {
    $scope.games = response.data;
  });
}
