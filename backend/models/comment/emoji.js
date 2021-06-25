const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const emojiSchema = new Schema({
    emojiName : {
        type: String,
        required: true
    },
    emojiPath : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Emoji', emojiSchema);