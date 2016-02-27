var bodyParser   = require('body-parser'),
  cookieParser   = require('cookie-parser'),
  express        = require('express'),
  expressSession = require('express-session'),
  hash           = require('bcrypt-nodejs'),
  LocalStrategy  = require('passport-local').Strategy,
  methodOverride = require('method-override'),
  mongoose       = require('mongoose'),
  passport       = require('passport'),
  path           = require('path');

// Configuration
// ================================================================================================

mongoose.connect(process.env.SUSHIDB);

var app = express();

// Get all data/stuff of the body (POST) parameters
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true })); // Parse application/x-www-form-urlencoded
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  // For livereload
  app.use(require('connect-livereload')());
}

// Override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// Set the static files location /client/img will be /img for users
app.use(express.static(__dirname + '/../client'));

// User authentication
// ================================================================================================

var User = require('./models/User.js');
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
// ================================================================================================

require('./routes')(app);

// Error hndlers
app.use(function (req, res, next) {
  var err = new Error('Not Found');
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

module.exports = app;
