const conversationModel = require('../models/conversation.model');




module.exports.newConversation = async (req, res) => {
 
  const convo =  new conversationModel({
    members:[req.body.senderId, req.body.receiverId],


   })
   try {
    const savedConversation = await convo.save();
    res.status(200).json(savedConversation)
} catch(err) {
    res.status(500).json(err)


}

};

module.exports.GetUserConv = async (req, res) => {


    try {

        const conversation = await conversationModel.find( {

            members : {$in:[ req.params.userId] },
        });
        res.status(200).json(conversation)

    } catch(err) {

        res.status(500).json(err)
    }
};

module.exports.FindConv = async (req, res) => {
try {
const conversation = await conversationModel.findOne({
    members: { $all: [req.params.firstUserId, req.params.secondUserId] },
});

res.status(200).json(conversation)
} catch(err)
{
    res.status(500).json(err)
}
};
