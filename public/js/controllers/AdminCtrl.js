angular.module('AdminCtrl', []).controller('AdminController',['$scope', 'Player', function($scope, Player) {

	$scope.tagline = 'The power to control everything!';	

	// File Upload - start
    $scope.data = {}; //init variable

    var fileSelect = document.createElement('input'); //input it's not displayed in html, I want to trigger it form other elements
    fileSelect.type = 'file';

    if (fileSelect.disabled) { //check if browser support input type='file' and stop execution of controller
      return;
    }
  
    $scope.click = function() { //activate function to begin input file on click
      fileSelect.click();
    }

    fileSelect.onchange = function() { //set callback to action after choosing file
      var f = fileSelect.files[0], r = new FileReader();

      r.onloadend = function(e) { //callback after files finish loading
        $scope.data.b64 = e.target.result;
        $scope.$apply();
        console.log($scope.data.b64.replace(/^data:image\/(png|jpg);base64,/, "")); //replace regex if you want to rip off the base 64 "header"

        //here you can send data over your server as desired
      }

      r.readAsDataURL(f); //once defined all callbacks, begin reading the file

    };
    // File Upload - end
    function init(){
    	$scope.player = {
            _id: "",
    		name: "",
    		img: ""
    	}
        $scope.game = {
            name: "",
            game: "",
            players: []
        }
        $scope.addPlayerToGame();
        $scope.games = ["Sushi-Go", "Sabateour"];
        Player.get().then(function(response){
            $scope.players =  response.data;
        });
        $scope.formType = 'add';
    }

    $scope.addPlayer = function () {
    	$scope.player.img = $scope.data.b64;
    	var data = 
		{
			name: $scope.player.name, 
			img: $scope.player.img
		}
		Player.create(data).then(function (){
			// Re-init values
			$scope.player.name = "";
			$scope.player.img = "";
            Player.get().then(function(response){
                $scope.players = response.data;
            });   
		}); 
	}

    $scope.edit = function (data) {
        $scope.player._id = data._id;
        $scope.player.name = data.name;
        $scope.player.img = data.img;
        $scope.formType = 'edit';
    }

    $scope.modifyPlayer = function () {
        Player.modify($scope.player._id, $scope.player).then(function (){
            $scope.player._id = "";
            $scope.player.name = "";
            $scope.player.img = "";
            $scope.formType = 'add';
            Player.get().then(function(response){
                $scope.players = response.data;
            });
        });
    }

    $scope.deletePlayer = function (data){
        Player.delete(data._id).then(function (){
            Player.get().then(function(response){
                $scope.players =  response.data;
            });
        });
    }

    $scope.addPlayerToGame = function (){
        var tempPlayer = {
            id: "",
            points: 0,
            ranking: 0
        }
        $scope.game.players.push(tempPlayer);
    }

    $scope.addGame = function (){
        $scope.player.img = $scope.data.b64;
        var data = 
        {
            name: $scope.game.name, 
            game: $scope.game.game,
            players: $scope.game.players
        }
        Player.addGame(data).then(function (){
            // Re-init values
            $scope.player.name = "";
            $scope.player.game = "";
            $scope.player.game = [];
            Player.get().then(function(response){
                $scope.players = response.data;
            });   
        }); 
    }

    init();

}]);