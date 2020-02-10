var express = require('express');
var app = express();
const bodyParser = require('body-parser')
var port = 3000;

var userRoute = require('./routes/user.route')
app.use(express.static('public'))

//goi method cua pug
app.set('view engine', 'pug');
app.set('views', './views')
// middleware cua body-parser
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/users', userRoute)
app.get('/', function(req, res){
    res.render("index",{name: 'Tam Pham'})
})

app.listen(port, function(){
    console.log("port is running....")
})