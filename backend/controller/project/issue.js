const Issue = require('../../models/project/issue');

const ResponseObject = require('../../utils/response');

const postIssue = async (req, res, next) => {
    try {
        await Issue.create({...req.body});
        await res.status(201).json({...ResponseObject['Success']['Created']});
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({
            ...ResponseObject['Server']['ServerError'],
            'error' : err
        });
    }
};

const getIssueAll = async (req, res, next) => {
    try {
        const options = req.query;
        const issues = await Issue.find(options);
        await res.status(200).json({
            ...ResponseObject['Success']['Success'],
            'issues' : issues
        });
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({
            ...ResponseObject['Server']['ServerError'],
            'error' : err
        });
    }
};

const getIssue = async (req, res, next) => {
    try {
        const issueId = req.params['issueId'];
        const issue = await Issue.findById(issueId);
        await res.status(200).json({
            ...ResponseObject['Success']['Success'],
            'issue' : issue
        });
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({
            ...ResponseObject['Server']['ServerError'],
            'error' : err
        });
    }

};

const updateIssue = async (req, res, next) => {
    try {
        const issueId = req.params['issueId'];
        await Issue.findByIdAndUpdate(issueId, {...req.body, 'updatedAt' : Date.now()});
        await res.status(200).json({...ResponseObject['Success']['Success']});
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({
            ...ResponseObject['Server']['ServerError'],
            'error' : err
        });
    }
};

const deleteIssue = async (req, res, next) => {
    try {
        const issueId = req.params['issueId'];
        await Issue.findByIdAndDelete(issueId);
        await res.status(200).json({...ResponseObject['Success']['Success']});
    }
    catch(err) {
        console.error(err);
        await res.status(500).json({
            ...ResponseObject['Server']['ServerError'],
            'error' : err
        });
    }
};

module.exports = { postIssue, getIssueAll, getIssue, updateIssue, deleteIssue };