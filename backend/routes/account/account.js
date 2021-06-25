const { postAccount, getAccountAll, getAccount, updateAccount, deleteAccount, login, isAdmin } = require('../../controller/account/account');

const express = require('express');
const router = express.Router();

router.post('/', postAccount);
router.post('/login', login);

router.get('/', getAccountAll);
router.get('/isadmin', isAdmin);
router.get('/:accountId', getAccount);
// router.get('/logout', logout);

router.put('/:accountId', updateAccount);

router.delete('/:accountId', deleteAccount);

module.exports = router;