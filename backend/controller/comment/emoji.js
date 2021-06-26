const fs = require('fs');
const multer = require('multer');

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
            cb( null, `${req.body['emojiListTitle']}-${Date.now()}.${file.originalname.split('.')[1]}`);
        }
    }
);

const emojiUpload = multer({ storage : storage });

const postEmoji = async (req, res, next) => {
    try {
        const emojiCheck = await EmojiList.find({'emojiListTitle' : req.body['emojiListTitle']});
        if (emojiCheck !== null || emojiCheck !== undefined) {
            res.status(400).json({
                'error' : 'Existed',
                'message' : '이미 존재하는 이름입니다.'
            });
        }

        const emojiList = await EmojiList.create(req.body);
        req.files.map(async (file, index) => {
            const emoji = await Emoji.create({
                'emojiName' : `${req.body['emojiListTitle']}${index}`,
                'emojiPath' : file.path
            });
            emojiList['emojiList'].push(emoji['_id']);
        })
        emojiList.save();
        await res.status(201).json(emojiList);
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