var mongoose = require('mongoose');

// TODO: better relationship between Game/Stat
//      => Stat for single game stat (player/stat values), Round for Game+Array<Stat>?
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
