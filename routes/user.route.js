var express = require('express')
var router = express.Router();

var db = require('../db');
var shortid= require("shortid")


router.get('/', function(req, res){
    res.render("users/index", {
        users : db.get("users").value()
    })
})
router.get('/:id', function(req,res){
    var id = parseInt( req.params.id)  ;
    var user = db.get("users").find({id : id}).value();
    console.log("asdasd " + user)
    res.render('users/view', {
        user : user
    })
})
router.get('/search', function(req,res){
    var q = req.query.q;
    var matchUsers = db.get("users").filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    }).write();
    res.render("users/index", {
        users : matchUsers
    })
})
router.get('/create',function(req, res){
    res.render('users/create')
})
//nhan data bang post
router.post('/create',function(req, res){
    req.body.id = shortid.generate();
    db.get("users").push(req.body).write();
    res.redirect('/users')
})
module.exports = router