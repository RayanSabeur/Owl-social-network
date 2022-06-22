const router = require('express').Router();
const messageController = require('../controllers/message.controller')
const Message = require('../models/message.model');


router.post("/" , messageController.createMessage)

router.get("/:conversationId", messageController.getMessageUser )







module.exports = router;