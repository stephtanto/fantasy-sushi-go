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

// Set the static files location /client/img will be /img for users
app.use(express.static(path.join(__dirname, '../client')));

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(cookieParser());
app.use(expressSession({
  secret: process.env.SUSHIDB,
  resave: false,
  saveUninitialized: false
}));

// Override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// Livereload in dev environment
if (process.env.NODE_ENV === 'development') {
  app.use(require('connect-livereload')());
}

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

module.exports = app;
