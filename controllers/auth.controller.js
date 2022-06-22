const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

const maxAge =  3 * 24 * 60 * 60 * 1000;

const createToken = (id) => { //constante pour creer notre token

    return jwt.sign({id}, process.env.TOKEN_SECRET, { //variable d'environement qu'on set dans le .env 

        expiresIn: maxAge //expiration du token
    })
};

module.exports.signUp = async (req, res) => {
 
const {pseudo, email, password} = req.body

try {
    const user = await UserModel.create({pseudo, email, password });
    res.status(201).json({user : user._id});
}
catch(err) {

    const errors = signUpErrors(err);
    res.status(200).send({errors}) //utils errors
}
}

module.exports.signIn = async (req,res) => {

    const { email, password } = req.body 

    try {

        const user = await UserModel.login(email , password); // on recup email password et on va check dans la bd si cet utilisiteur existe, on le stock dans user a loccaz
        const token = createToken(user._id); // on se creer un token, en y stockant l'id de notre user, et notre clé secrete
        res.cookie('jwt', token , {httpOnly: true, maxAge})
        res.status(200).json({user:user._id})
    } catch (err) {
 const errors = signInErrors(err);
        res.status(200).json({errors});
    }
}

module.exports.logout = (req, res) => {
res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}