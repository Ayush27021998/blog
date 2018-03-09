var express = require('express');
var router = express.Router();
var passport = require('passport');
var user = require('../models/user');

router.get('/',function(req,res){
    res.render('index');
});


router.post('/register',function(req,res){
    console.log(req.body);
    var newUser = new user({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.email
    });
    var password= req.body.password;
    user.register(newUser, password, function(err,user){
       res.render('landing',user);
    });
});

router.post('/login',passport.authenticate('local', {
    successRedirect: '/home/',
    failureRedirect: '/'
    }), function(req,res,err){
    
});
module.exports=router;
