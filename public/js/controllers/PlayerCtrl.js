angular.module('PlayerCtrl', []).controller('PlayerController', ['$scope', 'Player', function ($scope, Player) {

    $scope.tagline = 'Do you have what it takes?';

    function init () {
        Player.get().then(function (response) {
            $scope.players =  response.data;
        });
    }

    init();
}]);
