const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const issueCommentSchema = new Schema({
    commentIssue : {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Issue'
    },
    commentWriter : {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Account'
    },
    commentContent : {
        type: String,
        required: true
    },
    commentDepth : {
        type: Number,
        required: true
    },
    commentLikes : [{
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

module.exports = mongoose.model('IssueComment', issueCommentSchema);