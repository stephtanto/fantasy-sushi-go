var mongoose = require('mongoose');

module.exports = mongoose.model('Stat', {
    game: {
        type: String,
        default: ''
    },

    players: {
        type: [],
        default: []
    }
});
