app.controller('MainCtrl', ['$scope', function ($scope) {
  $scope.nav = [
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
    }
  ];
}]);

app.directive('autoNavActive', ['$location', function ($location) {
  return {
    restrict: 'A',
    scope: false,
    link: function (scope, element) {
      function setActive() {
        var path = $location.path();

        if (path) {
          angular.forEach(element.find('a'), function (anchor) {
            angular.element(anchor).toggleClass('header__nav__item--active', anchor.href.match(path + '(?=\\?|$)'));
          });
        }
      }

      setActive();
      scope.$on('$locationChangeSuccess', setActive);
    }
  };
}]);
