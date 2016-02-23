var Match = require('../models/Match');

module.exports = function (app) {
  app.get('/api/match', function (req, res) {
    Match.find(function (err, matchs) {
      if (err) {
        res.send(err);
      }

      res.json(matchs);
    });
  });

  app.get('/api/match/:id', function (req, res) {
    Match.find({matchId : req.params.id}, function (err, matches) {
      if (err) {
        res.send(err);
      }

      res.json(matches[0]);
    });
  });

  app.post('/api/match', function (req, res) {
    var newMatch = new Match({
      name: req.body.name,
      gameId: req.body.gameId,
      matchId: req.body.matchId,
      date: req.body.date
    });

    newMatch.save(function (err) {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Successfully added' });
    });
  });

  app.delete('/api/match/:id', function (req, res) {
    Match.remove({
      _id: req.params.id
    }, function (err, match) {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Successfully deleted' });
    });
  });

  app.put('/api/match/:id', function (req, res) {
    Match.findById(req.params.id, function (err, match) {
      if (err) {
        res.send(err);
      }

      match.name = req.body.name;
      match.gameId = req.body.gameId;
      match.date = req.body.date;

      match.save(function (err) {
        if (err) {
          res.send(err);
        }

        res.json({ message: 'Match updated!' });
      });
    });
  });
};
