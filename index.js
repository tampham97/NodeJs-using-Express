var express = require('express');
var app = express();
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var port = 3000;

var userRoute = require('./routes/user.route')
var authRoute = require('./routes/auth.route')
var productsRoute = require('./routes/products.route')
app.use(express.static('public'))
//goi method cua pug
app.set('view engine', 'pug');
app.set('views', './views')
// middleware cua body-parser
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser("asdasdasdasd"));

var authMiddleware = require('./middlewares/auth.middleware');
app.get('/', function(req, res){
    res.render("index",{name: 'Tam Pham'})
})

app.use('/users',authMiddleware.requireAuth, userRoute)
app.use('/auth', authRoute)
app.use('/products', productsRoute)


app.listen(port, function(){
    console.log("port is running....")
})