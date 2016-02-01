app.controller('GamesCtrl', ['$scope', 'GamesService', function ($scope, GamesService) {
    (function init () {
        GamesService.get().then(function (response) {
            $scope.games = response.data;
        });
    })();
}]);
