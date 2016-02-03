var mongoose = require('mongoose');

module.exports = mongoose.model('Player', {
    name: {
        type: String,
        default: ''
    },

    img: {
        type: String,
        default: ''
    }
});
