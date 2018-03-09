var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    localStrategy = require('passport-local'),
    user = require('./models/user'),
    session= require('express-session');

//MongoDB connection    
mongoose.connect("mongodb://localhost:27017/test", function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Database Connected");
    }
});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');

//Supporting Static files
app.use(express.static('public/css'));
app.use(express.static('public/js'));
app.use(express.static('public/images'));

//Passport Configuration
app.use(require('express-session')({
    secret: 'You know what, I am Awesome!!!',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

app.use(require('./routes/auth'));
//app.use(require('./routes/isLoggedin'));
app.use(require('./routes/post'));

app.listen(5000,function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Server Started");
    }
});
