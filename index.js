var express = require('express');
var app = express();
const bodyParser = require('body-parser')
var port = 3000;
//goi method cua pug
app.set('view engine', 'pug');
app.set('views', './views')
// middleware cua body-parser
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
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
app.get('/users/create',function(req, res){
    res.render('users/create')
})
//nhan data tu 
app.post('/users/create',function(req, res){
    users.push(req.body);
    res.redirect('/users')
})
app.listen(port, function(){
    console.log("port is running....")
})