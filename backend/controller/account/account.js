const { hashPassword, comparePassword } = require('../../utils/index');
const { createToken, checkToken } = require('../../utils/jwt');

const Account = require('../../models/account/account');

const postAccount = async (req, res, next) => {
    try {
        const payload = {...req.body, 'userPassword': hashPassword(req.body['userPassword'])};
        const account = await Account.create(payload);
        await res.status(201).json(account);
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({'error': err});
    }
};

const getAccountAll = async (req, res, next) => {
    try {
        const options = req.query;
        const accounts = await Account.find(options);
        await res.status(200).json(accounts);
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({'error': err});
    }
};

const getAccount = async (req, res, next) => {
    try {
        const accountId = req.params['accountId'];
        const account = await Account.findById(accountId);
        await res.status(200).json(account);
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({'error': err});
    }

};

const updateAccount = async (req, res, next) => {
    try {
        const accountId = req.params['accountId'];
        await Account.findByIdAndUpdate(accountId, {...req.body, 'updatedAt' : Date.now()});
        await res.status(200).json({'status' : 'success'});
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({'error': err});
    }
};

const deleteAccount = async (req, res, next) => {
    try {
        const accountId = req.params['accountId'];
        await Account.findByIdAndDelete(accountId);
        await res.status(200).json({'status' : 'success'});
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({'error': err});
    }
};

const login = async (req, res, next) => {
    try {
        const { userId, userPassword } = req.body;
        const account = await Account.findOne({'userId': userId});
        if (account !== null && account !== undefined) {
            if (comparePassword(userPassword, account['userPassword'])) {
                const payload = {
                    '_id': account['_id'],
                    'userName': account['userName'],
                    'userPoint' : account['userPoint'],
                    'profileImage': account['profileImage'],
                };
                const result = createToken(payload);
                res.cookie('token', result['token'])
                await res.status(200).json(result);
            }
            else {
                await res.status(401).json({'message': '비밀번호가 일치하지 않습니다!'});
            }
        }
        else {
            await res.status(404).json({'message': '유저가 존재하지 않습니다!'});
        }
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({'error': err});
    }
};

// const logout = async (req, res, next) => {

// };

const isAdmin = async (req, res, next) => {
    try {
        const data = checkToken(req, res).result;
        const account = await Account.findById(data['_id']);
        await res.status(200).json({'isAdmin' : account['isAdmin']});
    }
    
    catch(err) {
        console.error(err);
        await res.status(500).json({'error' : err});
    }
}

module.exports = { postAccount, getAccountAll, getAccount, updateAccount, deleteAccount, login, isAdmin };