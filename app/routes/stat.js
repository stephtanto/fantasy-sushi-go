var Stat = require('../models/Stat');

module.exports = function (app) {
    app.post('/api/addStat', function (req, res) {
        var newStat = new Stat({
            game: req.body.game,
            players: req.body.players
        });

        newStat.save(function (err) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Successfully added stat' });
        });
    });
};
