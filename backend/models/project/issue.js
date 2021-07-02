const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const issueSchema = new Schema({
    issueCreator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Account'
    },
    issueTitle: {
        type: String,
        required: true
    },
    issueContent: {
        type: String,
        required: true
    },
    issueProject: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    issueComment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
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

module.exports = mongoose.model('Issue', issueSchema);