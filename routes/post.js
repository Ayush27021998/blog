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

router.get('/edit/:id',isLoggedin,function(req,res){
    post.find({_id: req.params.id},function(err,post){
        res.render('edit',{posts: post});
    });
});

router.post('/edit',function(req,res){
    var newData={title: req.body.title, content: req.body.content};
    post.findByIdAndUpdate(req.body.id,{$set: newData},function(err,post){
        console.log(post);
        res.redirect('/home/');
    });
});

router.get('/delete/:id',function(req,res){
    post.remove({_id: req.params.id},function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/home');
        }
    });
});
module.exports= router;