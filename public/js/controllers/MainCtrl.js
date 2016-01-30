angular.module('MainCtrl', []).controller('MainController', function($scope) {

	$scope.tagline = 'To the moon and back!';
	function init(){
		$scope.nav = {
			tabs: [
			{path:"",value:"Home"},
			{path:"players",value:"Players"},
			{path:"admin",value:"Admin"}
			],
			active: 0
		};
		var pathname = window.location.pathname.slice(1);
		for(var i = 0; i < $scope.nav.tabs.length; i++){
			if (pathname == $scope.nav.tabs[i].path){
				$scope.nav.active = i;
				return;
			}
		}
	}

	init();

	$scope.changeTab = function(e, index){
		$scope.nav.active = index;
	};

});