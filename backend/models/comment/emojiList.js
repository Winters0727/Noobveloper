const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const emojiListSchema = new Schema({
    emojiListCreator : {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Account'
    },
    emojiListTitle : {
        type: String,
        required: true,
        unique: true
    },
    emojiList : [{
        type: String,
        default: []
    }],
    emojiPoint : {
        type: Number,
        default : 0
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports = mongoose.model('EmojiList', emojiListSchema);