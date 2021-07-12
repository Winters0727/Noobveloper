const { postComment, getCommentAll, updateComment, deleteComment } = require('../../controller/article/comment');

const express = require('express');
const router = express.Router();

router.post('/', postComment);

router.get('/:articleId', getCommentAll);

router.put('/:commentId', updateComment);

router.delete('/:commentId', deleteComment);

module.exports = router;