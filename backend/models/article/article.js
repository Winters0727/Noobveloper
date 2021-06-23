const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    articleWriter : {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Account'
    },
    articleTitle : {
        type: String,
        required: true,
        default: ''
    },
    articleContent : {
        type: String,
        required: true,
        default: ''
    },
    articleViewCount : {
        type: Number,
        default: 0
    },
    articleLikes : [{
        type: Schema.Types.ObjectId,
        ref: 'Account',
        default: []
    }],
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

module.exports = mongoose.model('Article', articleSchema);