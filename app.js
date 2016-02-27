var bodyParser   = require('body-parser'),
  express        = require('express'),
  methodOverride = require('method-override'),
  mongoose       = require('mongoose');

var app = module.exports.app = exports.app = express();


// Configuration ===========================================

var port = process.env.PORT || 8080;
mongoose.connect(process.env.SUSHIDB);

// Get all data/stuff of the body (POST) parameters
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true })); // Parse application/x-www-form-urlencoded

if (process.env.NODE_ENV === 'development') {
    // For livereload
    app.use(require('connect-livereload')());
}

// Override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// Set the static files location /client/img will be /img for users
app.use(express.static(__dirname + '/client'));


// Routes ==================================================

require('./server/routes')(app);


// Start app ===============================================

app.listen(port);
console.log('Server started on port', port);
