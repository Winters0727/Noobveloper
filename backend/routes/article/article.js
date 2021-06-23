const { postArticle, getArticleAll, getArticle, updateArticle, deleteArticle } = require('../../controller/article/article');

const express = require('express');
const router = express.Router();

router.post('/', postArticle);

router.get('/', getArticleAll);
router.get('/:articleId', getArticle);

router.put('/:articleId', updateArticle);

router.delete('/:articleId', deleteArticle);

module.exports = router;