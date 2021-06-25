const Comment = require('../../models/comment/comment');

const postComment = async (req, res, next) => {
    try {
        const comment = await Comment.create({...req.body});
        await res.status(201).json(comment);
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({'error': err});
    }
};

const getCommentAll = async (req, res, next) => {
    try {
        const articleId = req.params['articleId'];
        const options = req.query;
        const comments = await Article.find({...options, 'commentArticle' : articleId});
        await res.status(200).json(comments);
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({'error': err});
    }
};

const updateComment = async (req, res, next) => {
    try {
        const commentId = req.params['commentId'];
        await Comment.findByIdAndUpdate(commentId, {...req.body, 'updatedAt' : Date.now()});
        await res.status(200).json({'status' : 'success'});
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({'error': err});
    }
};

const deleteComment = async (req, res, next) => {
    try {
        const commentId = req.params['commentId'];
        await Comment.findByIdAndDelete(commentId);
        await res.status(200).json({'status' : 'success'});
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({'error': err});
    }
};

module.exports = { postComment, getCommentAll, updateComment, deleteComment };