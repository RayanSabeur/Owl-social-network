const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;


module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select("-password");
    res.status(200).json(users);
  };

  
  module.exports.userInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    UserModel.findById(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("ID unknown : " + err);
    }).select("-password");
  };
  
  module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            bio: req.body.bio,
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      )
        .then((docs) => {
               res.send(docs);
          if (err) return res.status(500).send({ message: err });
        }
      );
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };

  module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
try {

    await UserModel.remove({ _id: req.params.id}).exec();
    res.status(200).json({message : "supprimer avec succes"});

} catch (err) 
{

    return res.status(500).json({message : err })
}


  }

  
  module.exports.follow = async (req,res) => {
    if (
        !ObjectID.isValid(req.params.id) || 
        !ObjectID.isValid(req.body.idToFollow)
        
        )
    return res.status(400).send(' ID unknown : ' + req.params.id);
  
    try {

       //add to the followerlist
       await UserModel.findByIdAndUpdate(
        req.params.id, 
        {$addToSet : { following : req.body.idToFollow}},
        { new: true, upsert: true},
       )
        .then((docs, err) => {
            if (!err) res.status(201).json(docs);
            else return res.status(400).json(err)
        }
       );

       //add to followinglist

       await UserModel.findByIdAndUpdate(
           req.body.idToFollow,
           {$addToSet : {followers : req.params.id} },
           { new: true, upsert: true},
            )
           .then(( err) => {
               //if (!err) res.status(201).json(docs);
             if (err) return res.status(400).json(err);
           }

       )


    } catch (err) 
   {

    return res.status(500).json({message : err })
   }

  }


  
  module.exports.unfollow = async (req, res) => {
    if (
        !ObjectID.isValid(req.params.id) || 
        !ObjectID.isValid(req.body.idToUnfollow)
        
        )
    return res.status(400).send(' ID unknown : ' + req.params.id);
  
    try {

       //add to the followerlist
       await UserModel.findByIdAndUpdate(
        req.params.id, 
        {$pull : { following : req.body.idToUnfollow}},
        { new: true, upsert: true},
       )
        .then((docs, err) => {
            if (!err) res.status(201).json(docs);
            else return res.status(400).json(err)
        }
       );

       //add to followinglist

       await UserModel.findByIdAndUpdate(
           req.body.idToUnfollow,
           { $pull : {followers : req.params.id} },
           { new: true, upsert: true},
            )
           .then(( err) => {
               //if (!err) res.status(201).json(docs);
             if (err) return res.status(400).json(err);
           }

       )


    } catch (err) 
   {

    return res.status(500).json({message : err })
   }

  }
  module.exports.getUserParams = async (req, res) => {
     
    const userId = req.query.userId;
    const pseudo = req.query.pseudo;

    try {
      const  user = userId
       ? await UserModel.findById(userId) : 
        await UserModel.findOne({pseudo: pseudo})
      const {password, updatedAt, ...other} = user._doc

     res.status(200).json(other)

    } catch (err) {
      

      res.status(500).json(err)
    }

  }

  
  module.exports.friendUser = async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.userId);
      const friends = await Promise.all(
        user.following.map((friendId) => {
          return UserModel.findById(friendId);
        })
      );
      let friendList = [];
      friends.map((friend) => {
        const { _id, pseudo, picture } = friend;
        friendList.push({ _id, pseudo, picture });
      });
      res.status(200).json(friendList)
    } catch (err) {
      res.status(500).json(err);
    }
  ;
}
  
