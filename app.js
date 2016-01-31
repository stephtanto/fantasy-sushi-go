var express        = require('express');
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

var app = module.exports.app = exports.app = express();


// Configuration ===========================================

var port = process.env.PORT || 8080;
mongoose.connect(process.env.SUSHIDB);

// Get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({extended: true })); // parse application/x-www-form-urlencoded

// For livereload
app.use(require('connect-livereload')());

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users


// Routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// Start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); 			// shoutout to the user
