const express = require('express');
const router = express.Router();

router.use('/article', require('./article/article'));

router.use('/account', require('./account/account'));

router.use('/comment', require('./comment/comment'));

module.exports = router;