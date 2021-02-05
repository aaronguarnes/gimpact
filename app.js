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

app.get('/register', function (req, res) {
    res.render("register");
});

app.get('/database', function (req, res) {
    res.render("database");
});

app.get('/forum', function (req, res) {
    res.render("forum");
});

app.get('/characters', function (req, res) {
    res.render("characters");
});

app.get('/weapons', function (req, res) {
    res.render("weapons");
});

app.get('/artifacts', function (req, res) {
    res.render("artifacts");
});

app.get('/materials', function (req, res) {
    res.render("materials");
});

