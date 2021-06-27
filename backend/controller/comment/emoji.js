const fs = require('fs');
const path = require('path');
const multer = require('multer');

const { generateRandomString } = require('../../utils/index');

const Emoji = require('../../models/comment/emoji');
const EmojiList = require('../../models/comment/emojiList');

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
            const salt = generateRandomString(10);
            cb( null, `${req.body['emojiListTitle']}-${Date.now()}-${salt}.${path.extname(file.originalname)}`);
        }
    }
);

const emojiUpload = multer({ storage : storage });

const postEmoji = async (req, res, next) => {
    try {
        const emojiCheck = await EmojiList.find({'emojiListTitle' : req.body['emojiListTitle']});
        if (emojiCheck.length !== 0) {
            await res.status(400).json({
                'error' : 'Existed',
                'message' : '이미 존재하는 이름입니다.'
            });
        }

        else {
            const emojis = [];
            const promiseList = req.files.map((file, index) => {
                return new Promise(async (resolve, reject) => {
                    let emojiKey = generateRandomString(30);
                    while (true) {
                    let emojiKeyCheck = await Emoji.find({'emojiKey' : emojiKey});
                    if (emojiKeyCheck.length !== 0) {
                        emojiKey = generateRandomString(30);
                        continue
                    }
                    else {
                        emojis.push(emojiKey);
                        await Emoji.create({
                            'emojiKey' : emojiKey,
                            'emojiName' : `${req.body['emojiListTitle']}${index}`,
                            'emojiPath' : file.path
                        });
                        break
                      }
                    }
                    resolve();
                    reject(new Error('Request is failed'));
                })
            });

            await Promise.all(promiseList);
            const emojiList = await EmojiList.create({...req.body, 'emojiList' : emojis})
            await res.status(201).json(emojiList);
        }
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({'error': err});
    }
};

const getEmojiAll = async (req, res, next) => {
    try {
        const options = req.query;
        const emojis = await EmojiList.find(options);
        await res.status(200).json(emojis);
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({'error': err});
    }
};

const getEmoji = async (req, res, next) => {
    try {
        const emojiId = req.params['emojiId'];
        const emojiList = await EmojiList.findById(emojiId);
        await res.status(200).json(emojiList);
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({'error': err});
    }

};

const updateEmoji = async (req, res, next) => {
    try {
        const emojiId = req.params['emojiId'];
        await EmojiList.findByIdAndUpdate(emojiId, {...req.body, 'updatedAt' : Date.now()});
        await res.status(200).json({'status' : 'success'});
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({'error': err});
    }
};

const deleteEmoji = async (req, res, next) => {
    try {
        const emojiId = req.params['emojiId'];
        await EmojiList.findByIdAndDelete(emojiId);
        await res.status(200).json({'status' : 'success'});
    }

    catch(err) {
        console.error(err);
        await res.status(500).json({'error': err});
    }
};

module.exports = { postEmoji, emojiUpload, getEmojiAll, getEmoji, updateEmoji, deleteEmoji };