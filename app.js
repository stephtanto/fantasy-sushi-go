var bodyParser     = require('body-parser'),
    express        = require('express'),
    methodOverride = require('method-override'),
    mongoose       = require('mongoose');

var app = module.exports.app = exports.app = express();


// Configuration ===========================================

var port = process.env.PORT || 8080;
mongoose.connect(process.env.SUSHIDB);

// Get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

// For livereload
app.use(require('connect-livereload')());

// Override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// Set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));


// Routes ==================================================

require('./app/routes')(app);


// Start app ===============================================

app.listen(port);
console.log('Server started on port', port);
