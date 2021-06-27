const fs = require('fs');
const path = require('path');
const multer = require('multer');

const Emoji = require('../../models/comment/emoji');
const EmojiList = require('../../models/comment/emojiList');

const ResponseObject = require('../../utils/response');
const { generateRandomString } = require('../../utils/index');

let emojiExisted = false;

const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            const dir = `media/image/emoji/${req.body['emojiListTitle']}`;
            const emojiPath = `${__dirname}/../../media/image/emoji`;
            fs.readdir(emojiPath, (err, files) => {
                if (!(req.body['emojiListTitle'] in files)) {
                    fs.mkdir(`${emojiPath}/${req.body['emojiListTitle']}`, (err, path) => {
                        cb(null, dir);
                    });
                }
            })
        },
        filename: function ( req, file, cb ) {
            if (emojiExisted) {
                cb(null, 'dummy');
            }
            else {
            const salt = generateRandomString(10);
            cb( null, `${req.body['emojiListTitle']}-${Date.now()}-${salt}.${path.extname(file.originalname)}`);
          }
        }
    }
);

const emojiUpload = multer({
    storage : storage,
    fileFilter: async function (req, file, cb) {
        const emojiCheck = await EmojiList.find({'emojiListTitle' : req.body['emojiListTitle']});
        if (emojiCheck.length !== 0) {
            emojiExisted = true;
            cb(null, false);
          }
        cb(null, true);
    }
});

const postEmoji = async (req, res, next) => {
    try {
        if (emojiExisted) {
            emojiExisted = false;
            await res.status(400).json({
                ...ResponseObject['Duplication']['Data'],
                'target' : 'EmojiListTitle'
            })
        }
        else {
            const promiseList = req.files.map((file, index) => {
                return new Promise(async (resolve, reject) => {    
                    const emoji = await Emoji.create({
                        'emojiName' : `${req.body['emojiListTitle']}${index}`,
                        'emojiPath' : file.path
                    });
                    resolve(emoji['_id']);
                })
            });

            const emojis = await Promise.all(promiseList);
            await EmojiList.create({...req.body, 'emojiList' : emojis})
            await res.status(201).json({...ResponseObject['Success']['Created']});
        }
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({
            ...ResponseObject['Server']['ServerError'],
            'errorcode' : err
        });
    }
};

const getEmojiAll = async (req, res, next) => {
    try {
        const options = req.query;
        const emojis = await EmojiList.find(options);
        await res.status(200).json({
            ...ResponseObject['Success']['Success'],
            'emojis' : emojis
        });
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({
            ...ResponseObject['Server']['ServerError'],
            'errorcode' : err
        });
    }
};

const getEmoji = async (req, res, next) => {
    try {
        const emojiId = req.params['emojiId'];
        const emojiList = await EmojiList.findById(emojiId);
        await res.status(200).json({
            ...ResponseObject['Success']['Success'],
            'emojiList' : emojiList
        });
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({
            ...ResponseObject['Server']['ServerError'],
            'errorcode' : err
        });
    }

};

const updateEmoji = async (req, res, next) => {
    try {
        const emojiId = req.params['emojiId'];
        await EmojiList.findByIdAndUpdate(emojiId, {...req.body, 'updatedAt' : Date.now()});
        await res.status(200).json({...ResponseObject['Success']['Success']});
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({
            ...ResponseObject['Server']['ServerError'],
            'errorcode' : err
        });
    }
};

const deleteEmoji = async (req, res, next) => {
    try {
        const emojiId = req.params['emojiId'];
        await EmojiList.findByIdAndDelete(emojiId);
        await res.status(200).json({...ResponseObject['Success']['Success']});
    }
    catch(err) {
        console.error(err);
        await res.status(500).json({
            ...ResponseObject['Server']['ServerError'],
            'errorcode' : err
        });
    }
};

module.exports = { postEmoji, emojiUpload, getEmojiAll, getEmoji, updateEmoji, deleteEmoji };