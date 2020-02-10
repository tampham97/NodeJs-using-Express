var db = require('../db');

module.exports.requireAuth = function(req,res,next){
    if(!req.signedCookies.userId){
        res.redirect('/auth/login');
        return;
    }
    var user = db.get("users").find({ id : req.signedCookies.userId}).value();
    if(!user){
        res.redirect('/auth/login')
        return;
    }
    //gan bien user vao bien local de sd user o tat ca views
    res.locals.user = user;
    next();
}