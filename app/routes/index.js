var fs = require('fs');

module.exports = function (app) {
  // API routes in separate files
  fs.readdirSync(__dirname).forEach(function (file) {
    if (file === 'index.js') return;
    var name = file.substr(0, file.indexOf('.'));
    require('./' + name)(app);
  });

  // Frontend routes
  app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: __dirname + '/../../public/' });
  });
};
