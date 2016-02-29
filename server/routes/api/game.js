var Game = require('../../models/Game');

module.exports = function (app) {
  app.get('/api/games', function (req, res) {
    Game.find(function (err, games) {
      if (err) {
        res.send(err);
      }

      res.json(games);
    });
  });

  app.get('/api/games/:id', function (req, res) {
    Game.findOne({ gameId: req.params.id }, function (err, game) {
      if (err) {
        res.send(err);
      }

      if (game) {
        res.json(game);
      }
    });
  });

  app.post('/api/games', function (req, res) {
    var newGame = new Game({
      name: req.body.name,
      gameId: req.body.gameId
    });

    newGame.save(function (err) {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Successfully added game' });
    });
  });

  app.delete('/api/games/:id', function (req, res) {
    Game.remove({
      _id: req.params.id
    }, function (err, game) {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Successfully deleted' });
    });
  });

  app.put('/api/games/:id', function (req, res) {
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
