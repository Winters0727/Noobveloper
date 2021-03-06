const Article = require('../../models/article/article');

const ResponseObject = require('../../utils/response');

const postArticle = async (req, res, next) => {
    try {
        await Article.create({...req.body});
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

const getArticleAll = async (req, res, next) => {
    try {
        const options = req.query;
        const articles = await Article.find(options);
        await res.status(200).json({
            ...ResponseObject['Success']['Success'],
            'articles': articles
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

const getArticle = async (req, res, next) => {
    try {
        const articleId = req.params['articleId'];
        const article = await Article.findByIdAndUpdate(articleId, {$inc : { articleViewCount: 1 }});
        await res.status(200).json({
            ...ResponseObject['Success']['Success'],
            'article': article
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

const updateArticle = async (req, res, next) => {
    try {
        const articleId = req.params['articleId'];
        await Article.findByIdAndUpdate(articleId, {...req.body, 'updatedAt' : Date.now()});
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

const deleteArticle = async (req, res, next) => {
    try {
        const articleId = req.params['articleId'];
        await Article.findByIdAndDelete(articleId);
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

module.exports = { postArticle, getArticleAll, getArticle, updateArticle, deleteArticle };