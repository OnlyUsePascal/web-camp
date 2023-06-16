const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");  
const db = require('./database.js'); 
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcrypt');


// --- CONFIG ---
//encode config
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//session config
app.use(session({
    secret : 'something fishy',
    resave : false, 
    saveUninitialized : false,
    cookie : {
        maxAge : 1000 * 10, //cookie for 10sec
    }
}));
app.use(passport.initialize());
app.use(passport.session());

db.dbCon();

//passport config
passport.use('local', new LocalStrategy({ 
    //what attribute of request is username / password?
    usernameField: "username",
    passwordField: "pwd",
    passReqToCallback: true 
  }, async (req, _username, _pwd, done) => {
    //retrieve db for account
    //3 mode, err, "false", actual user
    try {
        console.log(_username + " " + _pwd);
        let user = await db.findUser(_username, _pwd);
 
        if (!user) return done(null, false);
        return done(null, user);
    } catch (err) {
        console.log(err);
        return done(err);
    }
}));
passport.serializeUser((user, done) => { 
    done(null, user.username);
});
passport.deserializeUser(async (_username, done) => {
    try {
        let user = await db.findUser(_username);
        return done(null, user);
    } catch (err) {
        console.log(err);
        return done(err);
    }
});

// --- RESQUEST HANDLER --- 
app.get('/', (req, res, next) => {
    res.render('home');
});

app.get('/secret', (req, res, next) => {
    if (req.isAuthenticated()){ //user not null
        res.render('secrets');
    } else {
        res.redirect('/login');
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local', { //validate with strategy
        failureRedirect: '/',
        session: true, 
    }, (err, user, info) => { 
        if (err) next(err);
        if (!user) {
            return res.redirect('/login');
        }
        
        //serialize user data into session
        req.login(user, err => { 
            if (err) next(err);
            res.redirect('/secret');
        })
    }) (req, res, next);
})

//more succinct post handler
// app.post('/login', passport.authenticate('local', { 
//     failureRedirect : '/login',
//     session : true,
// }), (req, res, next) => {
//     //sucess
//     res.redirect('/secret');
// });

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res, next) => {
    //add user + register cookie
    db.addUser(req.body.username, req.body.pwd).then(user => {
        req.login(user, err => {
            if (err) next(err);
            res.redirect('/secret');
        })
    }).catch(err => {
        next(err);
    });
});



module.exports = app;