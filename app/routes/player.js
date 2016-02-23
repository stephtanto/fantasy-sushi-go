var Player = require('../models/Player');

module.exports = function (app) {
  app.get('/api/players', function (req, res) {
    Player.find(function (err, players) {
      if (err) {
        res.send(err);
      }

      res.json(players);
    });
  });

  app.get('/api/players/:id', function (req, res) {
    Player.find({ playerId: req.params.id }, function (err, players) {
      if (err) {
        res.send(err);
      }

      res.json(players[0]);
    });
  });

  app.post('/api/players', function (req, res) {
    var newPlayer = new Player({
      playerId: req.body.playerId,
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

  app.delete('/api/players/:id', function (req, res) {
    Player.remove({
      _id: req.params.id
    }, function (err, player) {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Successfully deleted' });
    });
  });

  app.put('/api/players/:id', function (req, res) {
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
