var Game = require('../models/Game');

module.exports = function (app) {
    app.get('/api/getGames', function (req, res) {
        Game.find(function (err, games) {
            if (err) {
                res.send(err);
            }

            res.json(games);
        });
    });

    app.post('/api/addGame', function (req, res) {
        var newGame = new Game({
            name: req.body.name
        });

        newGame.save(function (err) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Successfully added game' });
        });
    });

    app.delete('/api/deleteGame/:id', function (req, res) {
        Game.remove({
            _id: req.params.id
        }, function (err, game) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Successfully deleted' });
        });
    });

    app.put('/api/modifyGame/:id', function (req, res) {
        Game.findById(req.params.id, function (err, game) {
            if (err) {
                res.send(err);
            }

            game.name = req.body.name;

            game.save(function (err) {
                if (err) {
                    res.send(err);
                }

                res.json({ message: 'Game updated!' });
            });
        });
    });
};
