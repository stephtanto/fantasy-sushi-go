app.controller('PlayersCtrl', ['$scope', 'PlayersService', function ($scope, PlayersService) {
    (function init () {
        PlayersService.get().then(function (response) {
            $scope.players = response.data;
        });
    })();
}]);
