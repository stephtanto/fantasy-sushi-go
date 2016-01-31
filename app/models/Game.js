var mongoose = require('mongoose');

module.exports = mongoose.model('Game', {
    name: {
        type : String,
        default: ''
    },

    game: {
        type: String,
        default: ''
    },

    players: {
        type: [],
        default: []
    }
});
