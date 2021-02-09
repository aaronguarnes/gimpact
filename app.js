const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const handlebars = require('handlebars');
const router = express.Router();
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb+srv://admin:mqVkTeEUKGRVhyur@gimpact.odeny.mongodb.net/gimpact?retryWrites=true&w=majority', function(err){
    if(err){
        return console.log(err);
    }

    return console.log("connected to mongodb")
});

const User = require('./model/User');
const Posts = require('./model/Post');
const { post } = require('./routes/login');
const { helpers } = require('handlebars');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(session({secret:"gomag532gj99j", resave:false, saveUninitialized:true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');

// const loginroute = require('./routes/login');
// app.use('/form', loginroute);

//Hbs Config
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'index',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    helpers:{
        limit: function (arr, limit) {
            if (!Array.isArray(arr)) {
                return [];
            }
            return arr.slice(0, limit);
        }
    }
}));


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', function (req, res) { //main page
    console.log(req.session);
    if(!req.session.user){
        res.render("main", {title: 'Gimpact - Guides, Database'});
    }
    else{
        res.render("main", {title: 'Gimpact - Guides, Database', user: req.session.user.firstname});
    }
});

app.get('/login', function (req, res) { //login page
    res.render('login', {title: 'Gimpact - Guides, Database', condition: false, form: true});
    console.log(req.session);
});

app.post('/login', async (req, res) => { //login function
    var body = req.body;
    var user = await User.findOne({username: body.username});

    if(user){
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (validPassword) {
          
          req.session.user = user;
          res.redirect("/");
          return res.status(200).send();
        }else {
            res.redirect("/");
            return res.status(400).send();
        }
    }else{       
        res.redirect("/");        
        res.status(401).send();
      }
    });


app.get('/register', function (req, res) { //reg page
    res.render('register', {form: true});
});



app.post('/register',function (req, res) { //reg function
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;

    var newuser = new User();
    newuser.firstname = firstname;
    newuser.lastname = lastname;
    newuser.email = email;
    newuser.password = password;
    newuser.isAdmin = false;
    newuser.save(function(err, savedUser) {
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        
        return res.status(200).send();
        res.render("main");
    })
})


app.get('/database', function (req, res) {
    if(!req.session.user){
        res.render("database", {title: 'Gimpact - Guides, Database'});
    }
    else{
        res.render("database", {title: 'Gimpact - Guides, Database', user: req.session.user.firstname});
    }
});

app.get('/forum', function (req, res) {
    if(!req.session.user){
        Posts.find({}).lean().exec(function (err, posts){
            console.log(posts)
            res.render("forum", { title: 'Gimpact - Guides, Database', post: posts })
     
        });
    }
    else{
        res.render("forum", {title: 'Gimpact - Guides, Database', user: req.session.user.firstname});
    }
});

app.get('/post/:_id', function(req, res) {
    Posts.findOne({_id: req.params}, function(err, post){
        if(err){
            console.log(err);
            return res.status(404).send();
        }
        console.log(post);
        res.render('post', {title: 'Gimpact - Guides, Database', post: post});
    })
    
    
});