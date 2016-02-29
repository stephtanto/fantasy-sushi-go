var fs = require('fs');

module.exports = function (app) {
  // User auth routes
  app.use('/user/', require('./users'));

  // Frontend routes
  app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: __dirname + '/../../client/' });
  });

  // API routes
  fs.readdirSync(__dirname + '/api/').forEach(function (file) {
    var name = file.substr(0, file.indexOf('.'));
    require('./api/' + name)(app);
  });

  // Error handlers
  app.use(function (req, res, next) {
    var err = new Error('Not found');
    err.status = 404;
    next(err);
  });

  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.end(JSON.stringify({
      message: err.message,
      error: {}
    }));
  });
};
