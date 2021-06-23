const Article = require('../../models/article/article');

const postArticle = async (req, res, next) => {
    try {
        const article = await Article.create({...req.body});
        await res.status(201).json(article);
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({'error': err});
    }
};

const getArticleAll = async (req, res, next) => {
    try {
        const options = req.query;
        const articles = await Article.find(options);
        await res.status(200).json(articles);
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({'error': err});
    }
};

const getArticle = async (req, res, next) => {
    try {
        const articleId = req.params['articleId'];
        const article = await Article.findByIdAndUpdate(articleId, {$inc : { articleViewCount: 1 }});
        await res.status(200).json(article);
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({'error': err});
    }

};

const updateArticle = async (req, res, next) => {
    try {
        const articleId = req.params['articleId'];
        await Article.findByIdAndUpdate(articleId, {...req.body, 'updatedAt' : Date.now()});
        await res.status(200).json({'status' : 'success'});
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({'error': err});
    }
};

const deleteArticle = async (req, res, next) => {
    try {
        const articleId = req.params['articleId'];
        await Article.findByIdAndDelete(articleId);
        await res.status(200).json({'status' : 'success'});
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({'error': err});
    }
};

module.exports = { postArticle, getArticleAll, getArticle, updateArticle, deleteArticle };