
const User = require('../model/user');

const bcrypt = require('bcrypt');
const userRouter = require('express').Router();

userRouter.post('/', async (req,res)=>{

    const { username, name, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        name,
        passwordHash
    });

    const savedUser = await user.save();

    res.json(savedUser);
});

module.exports = userRouter;