var mongoose = require('mongoose');

module.exports = mongoose.model('Game', {
  name: {
    type: String,
    default: ''
  },

  gameId: {
    type: Number,
    default: ''
  }
});
