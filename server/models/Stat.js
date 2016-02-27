var mongoose = require('mongoose');

module.exports = mongoose.model('Stat', {
  playerId: {
    type: Number,
    default: 0
  },

  matchId: {
    type: Number,
    default: 0
  },

  points: {
    type: Number,
    default: 0
  },

  ranking: {
    type: Number,
    default: 1
  }
});
