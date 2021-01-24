require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const bodyParser = require("body-parser");
const passport = require('passport');

const articleRouter = require('./routers/article');
const userRouter = require('./routers/user');
const app = express();
const { port, mongoURI } = process.env


//DB Connection
mongoose.connect(mongoURI, { useNewUrlParser: true,useCreateIndex: true,useUnifiedTopology: true})
    .then(res => console.log("Successfully connected to DB"))
    .catch(err => console.log("Error in DB Connection"));


//Middleware 
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(session({
    secret : 'paywork',
    saveUninitialized : true,
    resave : true,
    store : new MongoStore({
        url : mongoURI,
        collection : 'sessions'
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/article', articleRouter);
app.use('/user', userRouter);

app.listen(port, () =>{
    console.log("Application is listening to port :  ${port}");
})