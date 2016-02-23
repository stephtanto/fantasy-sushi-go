var Stat = require('../models/Stat');

module.exports = function (app) {
  app.get('/api/stats', function (req, res) {
    Stat.find(function (err, stats) {
      if (err) {
        res.send(err);
      }

      res.json(stats);
    });
  });

  app.get('/api/stats/:id', function (req, res) {
    Stat.find({ playerId: req.params.id }, function (err, stats) {
      if (err) {
        res.send(err);
      }

      res.json(stats);
    });
  });

  app.post('/api/stats', function (req, res) {
    var newStat = new Stat({
      playerId: req.body.player.playerId,
      matchId: req.body.matchId,
      points: req.body.player.points,
      ranking: req.body.player.ranking
    });

    newStat.save(function (err) {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Successfully added' });
    });
  });

  app.delete('/api/stats/:id', function (req, res) {
    Stat.remove({
      matchId: req.params.id
    }, function (err, game) {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Successfully deleted' });
    });
  });
};
