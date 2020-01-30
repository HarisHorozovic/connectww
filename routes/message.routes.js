const express = require('express');

// Controllers
const authController = require('../controllers/auth.controller');
const messagesController = require('../controllers/messages.controller');

const router = express.Router();

// Only logged in users can type messages
router.use(authController.protect);

router.route('/').post(messagesController.sendMessage);

router.route('/:userId').get(messagesController.getMessages);

router.route('/:messageId').delete(messagesController.deleteMessage);

module.exports = router;
