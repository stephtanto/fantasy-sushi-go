var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = mongoose.model('Round', {
    // game: {
    //     type: ObjectId
    // },

    // stats: {
    //     type: [ObjectId],
    //     default: []
    // },

    // timestamp: {
    //     type: Date,
    //     default: Date.now
    // }
});
