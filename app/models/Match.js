var mongoose = require('mongoose');

module.exports = mongoose.model('Match', {
  gameId: {
    type: Number,
    default: 0
  },

  date: {
    type: Date,
    default: 0
  },

  matchId: {
    type: Number,
    default: 0
  },

  name: {
    type: String,
    default: ''
  }
});
