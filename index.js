// import mongoose
const mongoose = require('mongoose');

// import config
const config = require('./utils/config');

// import app
const app = require('./app');

// connect ot mongodb 
mongoose.connect(config.MONGODB_URI)
    .then(()=>{
        console.log("connected to mongodb..,");

        // server start
        app.listen(config.PORT,()=>{
            console.log(`Server running on port ${config.PORT}`);
        })
    })
    .catch((error)=>{
        console.log(error);
    })