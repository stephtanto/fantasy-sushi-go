app.controller('AdminCtrl', ['$scope', 'GamesService', 'PlayersService', function ($scope, GamesService, PlayersService) {

    // File Upload - start
    $scope.data = {};

    var fileSelect = document.createElement('input'); //input it's not displayed in html, I want to trigger it from other elements
    fileSelect.type = 'file';

    if (fileSelect.disabled) { //check if browser support input type='file' and stop execution of controller
        return;
    }

    $scope.click = function() { //activate function to begin input file on click
        fileSelect.click();
    }

    fileSelect.onchange = function () { //set callback to action after choosing file
        var f = fileSelect.files[0],
            r = new FileReader();

        r.onloadend = function (e) { //callback after files finish loading
            $scope.data.b64 = e.target.result;
            $scope.$apply();
            console.log($scope.data.b64.replace(/^data:image\/(png|jpg);base64,/, '')); //replace regex if you want to rip off the base 64 "header"

            //here you can send data over your server as desired
        }

        r.readAsDataURL(f); //once defined all callbacks, begin reading the file
    };
    // File Upload - end

    // Init - start
    $scope.game = {
        _id: '',
        name: ''
    };

    $scope.player = {
        _id: '',
        name: '',
        img: ''
    };

    $scope.stat = {
        game: '',
        players: []
    };

    GamesService.get().then(function (response) {
        $scope.games = response.data;
    });

    PlayersService.get().then(function (response) {
        $scope.players = response.data;
    });

    $scope.formType = 'add';
    // Init - end

    $scope.addGame = function () {
        var data = {
            name: $scope.game.name
        };

        GamesService.create(data).then(function () {
            $scope.game.name = '';

            GamesService.get().then(function (response) {
                $scope.games = response.data;
            });
        });
    };

    $scope.editGame = function (game) {
        $scope.formType = 'edit';
        $scope.game = game;
    };

    $scope.modifyGame = function () {
        GamesService.modify($scope.game._id, $scope.game).then(function () {
            $scope.game._id = '';
            $scope.game.name = '';
            $scope.formType = 'add';

            GamesService.get().then(function (response) {
                $scope.games = response.data;
            });
        });
    };

    $scope.deleteGame = function (data) {
        GamesService.delete(data._id).then(function () {
            GamesService.get().then(function (response) {
                $scope.games = response.data;
            });
        });
    };

    $scope.addPlayer = function () {
        $scope.player.img = $scope.data.b64;

        var data = {
            name: $scope.player.name,
            img: $scope.player.img
        };

        PlayersService.create(data).then(function () {
            // Re-init values
            $scope.player.name = '';
            $scope.player.img = '';

            PlayersService.get().then(function (response) {
                $scope.players = response.data;
            });
        });
    };

    $scope.editPlayer = function (player) {
        $scope.formType = 'edit';
        $scope.player = player;
    };

    $scope.modifyPlayer = function () {
        PlayersService.modify($scope.player._id, $scope.player).then(function () {
            $scope.player._id = '';
            $scope.player.name = '';
            $scope.player.img = '';
            $scope.formType = 'add';

            PlayersService.get().then(function (response) {
                $scope.players = response.data;
            });
        });
    };

    $scope.deletePlayer = function (data) {
        PlayersService.delete(data._id).then(function () {
            PlayersService.get().then(function (response) {
                $scope.players = response.data;
            });
        });
    };

    $scope.addPlayerToStat = function () {
        var tempPlayer = {
            id: '',
            points: 0,
            ranking: 0
        };

        $scope.stat.players.push(tempPlayer);
    };

    $scope.addStat = function () {
        var data = {
            game: $scope.game.game,
            players: $scope.game.players
        };

        // StatsService.create(data).then(function () {
        //     // Re-init values
        //     $scope.player.game = '';
        //     $scope.player.game = [];
        //     PlayersService.get().then(function(response){
        //         $scope.players = response.data;
        //     });
        // });
    };
}]);
