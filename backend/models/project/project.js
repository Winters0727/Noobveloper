const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    projectCreator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Account'
    },
    projectTitle: {
        type: String,
        required: true
    },
    projectContent: {
        type: String,
        required: true
    },
    projectContributors: [{
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'Account'
    }],
    projectGithubURL: {
        type: String,
        default: ''
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

module.exports = mongoose.model('Project', projectSchema);