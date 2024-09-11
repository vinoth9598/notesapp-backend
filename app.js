// require express

const express = require('express');
const app = express();

// require cors
const cors = require('cors');

// import endpont 
const userRouter = require('./controller/users');
const loginRouter = require('./controller/login');
const noteRouter = require('./controller/notes');

// middleware 
app.use(express.json());
app.use(cors());

app.use('/users',userRouter);
app.use('/login',loginRouter);
app.use('/notes',noteRouter);

module.exports = app;