
const notesRouter = require('express').Router();
const config = require('../utils/config');
const jwt = require ('jsonwebtoken');
const Note = require ('../model/note');
const User = require('../model/user');

const getTokenFrom = request =>{
    const authorization = request.get('Authorization');

    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        return authorization.substring(7);
    }
    return null;
}

notesRouter.post('/', async (request,response)=>{
    
    const noteObject = request.body;

    const token = getTokenFrom(request);

    const decodedToken = jwt.verify(token, config.JWT_SECRET);

    if(!token || !decodedToken.id){
        return response.status(401).json({
            error:"token missing or invalid"
        });
    }

    const user = await User.findById(decodedToken.id);

    const note = new Note ({
        content:noteObject.content,
        user:user._id
    });

    const savedNote = await note.save();

    user.notes = user.notes.concat(savedNote._id);

    await user.save();

    response.json({message:"Note saved successfully..,",note:savedNote});


});


notesRouter.get('/', async(request,response)=>{

    const token = getTokenFrom(request);

    const decodedToken = jwt.verify(token, config.JWT_SECRET);

    if(!token || !decodedToken.id){
        return response.status(401).json({
            error:"token missing or invalid"
        });
    }

    const user = await User.findById(decodedToken.id).populate('notes',{
        content:1,
        createdAt:1
    });

    response.json(user.notes);
});

module.exports = notesRouter;