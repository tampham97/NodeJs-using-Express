var express = require('express');

var app = express();
var port = 3000;
//goi method cua pug
app.set('view engine', 'pug');
app.set('views', './views')

var users=  [
    {id: 1, name : "Tam"},
    {id: 2, name : "Ti"},
    {id: 3, name : "Teo"}
]

app.get('/', function(req, res){
    res.render("index",{name: 'Tam Pham'})
})
app.get('/users', function(req, res){
    res.render("users/index", {
        users : users
    })
})
app.get('/users/search', function(req,res){
    var q = req.query.q;
    var matchUsers = users.filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render("users/index", {
        users : matchUsers
    })
})
app.listen(port, function(){
    console.log("port is running....")
})