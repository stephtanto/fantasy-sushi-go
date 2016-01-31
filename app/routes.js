var Player = require('./models/player');

module.exports = function (app) {

    // server routes ===========================================================

    app.post('/api/addPlayer', function(req, res){
        var newPlayer = new Player({
            name: req.body.name,
            img: req.body.img
        });
        newPlayer.save(function(err){
            if (err) throw err;
            res.json({ message: 'Successfully added' });
        });
    });

    app.get('/api/getPlayers', function(req, res){
        Player.find(function(err, players){
            // if there is an error retrieving, send the error
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);
            res.json(players);  // return all nerds in JSON format
        });
    });

    app.delete('/api/deletePlayer/:id', function(req, res) {
        Player.remove({
            _id: req.params.id
        }, function(err, player) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

    app.put('/api/modifyPlayer/:id', function(req, res) {

        // use our bear model to find the bear we want
        Player.findById(req.params.id, function(err, player) {

            if (err)
                res.send(err);

            player.name = req.body.name;  // update the bears info
            player.img = req.body.img;
            // save the bear
            player.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Player updated!' });
            });

        });
    });

    app.post('/api/addGame', function(req, res){
        var newGame = new Game({
            name: req.body.name,
            game: req.body.game,
            players: req.body.players
        });
        newGame.save(function(err){
            if (err) throw err;
            res.json({ message: 'Successfully added game' });
        });
    });

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('/', function(req, res) {
        res.sendfile('./public/index.html');
    });

    app.get('/admin', function(req, res) {
        res.sendfile('./public/index.html');
    });

    app.get('/players', function(req, res) {
        res.sendfile('./public/index.html');
    });


};
