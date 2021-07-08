const fs = require('fs');
const path = require('path');
const multer = require('multer');

const { hashPassword, comparePassword } = require('../../utils/index');
const { createToken, checkToken } = require('../../utils/jwt');

const Account = require('../../models/account/account');

const ResponseObject = require('../../utils/response');

let imageExt;

const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'media/image/profile/')
          },
        filename: function ( req, file, cb ) {
            imageExt = path.extname(file.originalname);
            cb( null, `undefined.${imageExt}`);
        }
    }
);

const profileUpload = multer({ storage : storage });

const postAccount = async (req, res, next) => {
    try {
        const payload = {...req.body, 'userPassword': hashPassword(req.body['userPassword'])};
        if (req.file) {
            fs.rename(
                `media/image/profile/undefined.${imageExt}`,
                `media/image/profile/${req.body['userName']}-profile.${imageExt}`,
                () => {});
            payload['profileImage'] = `media/image/profile/${req.body['userName']}-profile.${imageExt}`;
        }
        const account = await Account.create(payload);
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

const getAccountAll = async (req, res, next) => {
    try {
        const options = req.query;
        const accounts = await Account.find(options);
        await res.status(200).json({
            ...ResponseObject['Success']['Success'],
            'accounts': accounts
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

const getAccount = async (req, res, next) => {
    try {
        const accountId = req.params['accountId'];
        const account = await Account.findById(accountId);
        await res.status(200).json({
            ...ResponseObject['Success']['Success'],
            'account': account
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

const updateAccount = async (req, res, next) => {
    try {
        const accountId = req.params['accountId'];
        await Account.findByIdAndUpdate(accountId, {...req.body, 'updatedAt' : Date.now()});
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

const deleteAccount = async (req, res, next) => {
    try {
        const accountId = req.params['accountId'];
        await Account.findByIdAndDelete(accountId);
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
                res.cookie('token', result['token']);
                await res.status(200).json({
                    ...ResponseObject['Success']['Success'],
                    'result': result
                });
            }
            else {
                await res.status(401).json({
                    ...ResponseObject['Account']['Password'],
                });
            }
        }
        else {
            await res.status(404).json({
                ...ResponseObject['Account']['Account'],
            });
        }
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({
            ...ResponseObject['Server']['ServerError'],
            'error' : err
        });
    }
};

// const logout = async (req, res, next) => {

// };

const isAdmin = async (req, res, next) => {
    try {
        const data = checkToken(req, res).result;
        const account = await Account.findById(data['_id']);
        await res.status(200).json({
            ...ResponseObject['Success']['Success'],
            'isAdmin': account['isAdmin']
        });
    }
    
    catch(err) {
        console.error(err);
        await res.status(500).json({
            ...ResponseObject['Server']['ServerError'],
            'error' : err
        });
    }
}

module.exports = { postAccount, profileUpload, getAccountAll, getAccount, updateAccount, deleteAccount, login, isAdmin };