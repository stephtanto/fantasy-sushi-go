var User = require('../../models/User');

module.exports = function (app) {
  app.get('/api/users', function (req, res) {
    User.find(function (err, users) {
      if (err) {
        res.send(err);
      }

      res.json(users);
    });
  });

  app.put('/api/users/:id', function (req, res) {
    User.findById({ _id: req.params.id }, function (err, user) {
      if (err) {
        res.send(err);
      }

      user.username = req.body.username;
      user.admin = req.body.admin;

      user.save(function (err) {
        if (err) {
          res.send(err);
        }

        res.json({ message: 'User updated!' });
      });
    });
  });
};
