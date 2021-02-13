

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    video: {
        type: String
    }
})

module.exports = mongoose.model('Video', videoSchema)