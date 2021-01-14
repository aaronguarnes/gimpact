const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const handlebars = require('handlebars');
const router = express.Router();


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');

const loginroute = require('./routes/login');

app.use('/login', loginroute);

//Hbs Config
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'index',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', function (req, res) {
    res.render("main");
});

app.get('/login', function (req, res) {
    res.render("login");
});

app.post('/login', function (req, res) {
    //login function
});

app.get('/register', function (req, res) {
    res.render("register");
});

app.post('/register', function (req, res) {
    //register function
});



