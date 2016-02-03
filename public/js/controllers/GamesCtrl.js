app.controller('GamesCtrl', ['$scope', 'GamesService', function ($scope, GamesService) {
    GamesService.get().then(function (response) {
        $scope.games = response.data;
    });
}]);
