var mongoose = require('mongoose');

module.exports = mongoose.model('Player', {
  playerId: {
    type: Number,
    default: 0
  },

  name: {
    type: String,
    default: ''
  },

  img: {
    type: String,
    default: ''
  }
});
