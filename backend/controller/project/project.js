const Project = require('../../models/project/project');

const ResponseObject = require('../../utils/response');

const postProject = async (req, res, next) => {
    try {
        await Project.create({...req.body});
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

const getProjectAll = async (req, res, next) => {
    try {
        const options = req.query;
        const projects = await Project.find(options);
        await res.status(200).json({
            ...ResponseObject['Success']['Success'],
            'projects' : projects
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

const getProject = async (req, res, next) => {
    try {
        const projectId = req.params['projectId'];
        const project = await Project.findById(projectId);
        await res.status(200).json({
            ...ResponseObject['Success']['Success'],
            'project' : project
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

const updateProject = async (req, res, next) => {
    try {
        const projectId = req.params['projectId'];
        await Project.findByIdAndUpdate(projectId, {...req.body, 'updatedAt' : Date.now()});
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

const deleteProject = async (req, res, next) => {
    try {
        const projectId = req.params['projectId'];
        await Project.findByIdAndDelete(projectId);
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

module.exports = { postProject, getProjectAll, getProject, updateProject, deleteProject };