var express = require('express');
var app = express();
const bodyParser = require('body-parser')
var port = 3000;
//lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
db.defaults({ users: [] })
  .write()

//goi method cua pug
app.set('view engine', 'pug');
app.set('views', './views')
// middleware cua body-parser
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/', function(req, res){
    res.render("index",{name: 'Tam Pham'})
})
app.get('/users', function(req, res){
    res.render("users/index", {
        users : db.get("users").value()
    })
})
app.get('/users/search', function(req,res){
    var q = req.query.q;
    var matchUsers = db.get("users").filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    }).write();
    res.render("users/index", {
        users : matchUsers
    })
})
app.get('/users/create',function(req, res){
    res.render('users/create')
})
//nhan data tu 
app.post('/users/create',function(req, res){
    db.get("users").push(req.body).write();
    res.redirect('/users')
})
app.listen(port, function(){
    console.log("port is running....")
})