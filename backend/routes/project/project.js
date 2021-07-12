const { postProject, getProjectAll, updateProject, deleteProject } = require('../../controller/project/project');

const express = require('express');
const router = express.Router();

router.post('/', postProject);

router.get('/:projectId', getProjectAll);

router.put('/:projectId', updateProject);

router.delete('/:projectId', deleteProject);

module.exports = router;