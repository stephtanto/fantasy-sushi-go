var fs = require('fs');

module.exports = function (app) {
  // API routes
  fs.readdirSync(__dirname + '/api/').forEach(function (file) {
    var name = file.substr(0, file.indexOf('.'));
    require('./api/' + name)(app);
  });

  // User auth routes
  app.use('/user/', require('./users'));

  // Frontend routes
  app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: __dirname + '/../../client/' });
  });
};
