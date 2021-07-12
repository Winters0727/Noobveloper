const { postIssue, getIssueAll, updateIssue, deleteIssue } = require('../../controller/project/issue');

const express = require('express');
const router = express.Router();

router.post('/', postIssue);

router.get('/:issueId', getIssueAll);

router.put('/:issueId', updateIssue);

router.delete('/:issueId', deleteIssue);

module.exports = router;