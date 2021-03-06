const express = require('express');
const router = express.Router();

router.use('/article', require('./article/article'));
router.use('/article/comment', require('./article/comment'));

router.use('/account', require('./account/account'));

router.use('/emoji', require('./comment/emoji'));

module.exports = router;