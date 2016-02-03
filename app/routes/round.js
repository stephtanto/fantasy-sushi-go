var Round = require('../models/Round');
var Stat = require('../models/Stat');

module.exports = function (app) {
    app.get('/api/rounds', function (req, res) {
        Round.find(function (err, rounds) {
            if (err) {
                res.send(err);
            }

            res.json(rounds);
        });
    });

    app.post('/api/rounds', function (req, res) {
        // // Create the stats
        // app.post('/api/stats', function (req, res) {
        //     var newStat = new Stat({
        //         name: req.body.name,
        //         img: req.body.img
        //     });

        //     newStat.save(function (err) {
        //         if (err) {
        //             res.send(err);
        //         }

        //         res.json({ message: 'Successfully added' });
        //     });
        // });

        var newRound = new Round({
            // game: req.body.game._id,
            // stats: req.body.stats
        });

        newRound.save(function (err) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Successfully added' });
        });
    });
};
