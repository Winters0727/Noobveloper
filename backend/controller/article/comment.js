const Comment = require('../../models/comment/comment');

const ResponseObject = require('../../utils/response');

const postComment = async (req, res, next) => {
    try {
        await Comment.create({...req.body});
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

const getCommentAll = async (req, res, next) => {
    try {
        const articleId = req.params['articleId'];
        const options = req.query;
        await Comment.find({...options, 'commentArticle' : articleId});
        await res.status(200).json({
            ...ResponseObject['Success']['Success'],
            'comments': comments
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

const updateComment = async (req, res, next) => {
    try {
        const commentId = req.params['commentId'];
        const comment = await Comment.findByIdAndUpdate(commentId, {...req.body, 'updatedAt' : Date.now()});
        await res.status(200).json({
            ...ResponseObject['Success']['Success'],
            'comment': comment
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

const deleteComment = async (req, res, next) => {
    try {
        const commentId = req.params['commentId'];
        await Comment.findByIdAndDelete(commentId);
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

module.exports = { postComment, getCommentAll, updateComment, deleteComment };