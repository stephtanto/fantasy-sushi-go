app.controller('MainCtrl', ['$scope', function ($scope) {

    $scope.nav = {
        tabs: [
            {
                path: '',
                title: 'Home'
            },
            {
                path: 'games',
                title: 'Games'
            },
            {
                path: 'players',
                title: 'Players'
            },
            {
                path: 'admin',
                title: 'Admin'
            }
        ],
        active: 0
    };

    $scope.changeTab = function (index) {
        $scope.nav.active = index;
    };

    (function init () {
        var pathname = window.location.pathname.slice(1);
        for (var i = 0, len = $scope.nav.tabs.length; i < len; i++) {
            if (pathname === $scope.nav.tabs[i].path) {
                $scope.nav.active = i;
                return;
            }
        }
    })();

}]);
