app.controller('PlayersCtrl', ['$scope', 'PlayersService', function ($scope, PlayersService) {
    PlayersService.get().then(function (response) {
        $scope.players = response.data;
    });
}]);
