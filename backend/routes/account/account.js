const { postAccount, profileUpload, getAccountAll, getAccount, updateAccount, deleteAccount, login, isAdmin } = require('../../controller/account/account');

const express = require('express');
const router = express.Router();
const multer = require('multer');

router.post('/', postAccount, profileUpload.single('profileImage'));
router.post('/login', login);

router.get('/', getAccountAll);
router.get('/isadmin', isAdmin);
router.get('/:accountId', getAccount);
// router.get('/logout', logout);

router.put('/:accountId', updateAccount);

router.delete('/:accountId', deleteAccount);

module.exports = router;