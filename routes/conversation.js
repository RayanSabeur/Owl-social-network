const router = require('express').Router();
const conversationController = require('../controllers/conversation.controller')

//new conv
//get conv of a user


router.post("/" , conversationController.newConversation)

router.get("/:userId", conversationController.GetUserConv )

router.get("/find/:firstUserId/:secondUserId", conversationController.FindConv)
module.exports = router;