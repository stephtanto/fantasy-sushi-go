app.controller('PlayerCtrl', ['$scope', 'PlayerService', function ($scope, PlayerService) {

    function init () {
        PlayerService.get().then(function (response) {
            $scope.players = response.data;
        });
    }

    init();
}]);
