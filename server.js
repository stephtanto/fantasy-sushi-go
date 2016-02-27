#!/usr/bin/env node

var app = require('./server/app');

var port = process.env.PORT || 8080;

var server = app.listen(port, function () {
  console.log('Server started on port', server.address().port);
});
