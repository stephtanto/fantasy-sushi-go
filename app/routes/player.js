var Player = require('../models/Player');

module.exports = function (app) {
    app.get('/api/getPlayers', function (req, res) {
        Player.find(function (err, players) {
            if (err) {
                res.send(err);
            }

            res.json(players);
        });
    });

    app.post('/api/addPlayer', function (req, res) {
        var newPlayer = new Player({
            name: req.body.name,
            img: req.body.img
        });

        newPlayer.save(function (err) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Successfully added' });
        });
    });

    app.delete('/api/deletePlayer/:id', function (req, res) {
        Player.remove({
            _id: req.params.id
        }, function (err, player) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Successfully deleted' });
        });
    });

    app.put('/api/modifyPlayer/:id', function (req, res) {
        Player.findById(req.params.id, function (err, player) {
            if (err) {
                res.send(err);
            }

            player.name = req.body.name;
            player.img = req.body.img;

            player.save(function (err) {
                if (err) {
                    res.send(err);
                }

                res.json({ message: 'Player updated!' });
            });
        });
    });
};
