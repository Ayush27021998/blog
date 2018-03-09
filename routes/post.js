var express = require('express');
var router = express.Router();
var post = require('../models/postmodel');

function isLoggedin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    //req.flash('error', 'You must be signed in to do that!');
    res.redirect('/');
}

router.get('/home',isLoggedin,function(req,res){
    post.find({},function(err,allPosts){
        console.log(allPosts);
        //res.send('wait man');
        res.render('home',{posts: allPosts, user:req.user});
    });
});

router.get('/create',isLoggedin,function(req,res){
    res.render('create');
});

router.post('/create',isLoggedin,function(req,res){
    var newPost= new post({
        title: req.body.title,
        content: req.body.content,
        createdBy: req.user.username
    });
    newPost.save();
    res.redirect('/home');
});



module.exports= router;