const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6
    },
    picture: {
      type: String,
      default: "./uploads/profil/random-user.png"
    },
    bio :{
      type: String,
      max: 1024,
    },
    followers: {
      type: [String]
    },
    following: {
      type: [String]
    },
    likes: {
      type: [String]
    }
  },
  {
    timestamps: true,
  }
);

// play function before save into display: 'block',
userSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function(email,password) {
  const user = await this.findOne({email}); // on va comparé le mdp par rapport a email qu'on a passé
  if (user) {
    const auth = await bcrypt.compare(password, user.password); //user.password c ce qui se trouve dans notre base de donnee et password 
                                                                //c cqu'on va mettre dans l'input il va comparer
    if(auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect password');
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;