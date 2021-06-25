const { postEmoji, emojiUpload, getEmojiAll, getEmoji, updateEmoji, deleteEmoji } = require('../../controller/comment/emoji');

const express = require('express');
const router = express.Router();

router.post('/', postEmoji, emojiUpload.array('emojis', 20));

router.get('/', getEmojiAll);
router.get('/:emojiId', getEmoji);

router.put('/:emojiId', updateEmoji);

router.delete('/:emojiId', deleteEmoji);

module.exports = router;