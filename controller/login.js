
const User = require('../model/user');
const config = require('../utils/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginRouter = require('express').Router();

loginRouter.post('/',async (req,res)=>{
    // get the credentials from the request body
    const { username,password } = req.body;
    
    // check if the user exists in the database
    const user = await User.findOne({ username });

    if(!user){
        return res.status(401).json({message:"user does not exist"});
    }

   const isAuthenticated = await bcrypt.compare(password, user.passwordHash);

   if(!isAuthenticated){
        return res.status(401).json({
            message:"password is incorrect"
        });
   }

    //define the payload of the token
    const payload = {
            username:user.username,
            id:user._id
    }

    // if the password is correct, generate a token
    const token = jwt.sign(payload,config.JWT_SECRET,{expiresIn:'1h'});

    // send the token as response
    res.status(200).json({
        token,username:user.username, name:user.name
    })


});

module.exports = loginRouter;