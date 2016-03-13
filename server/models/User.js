var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  username: String,
  password: String,
  admin: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);
