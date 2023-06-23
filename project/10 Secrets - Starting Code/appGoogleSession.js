const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");  
const db = require('./database.js'); 
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const session = require('express-session');


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
        maxAge : 1000 * 15, //cookie for 10sec 
    }
}));
app.use(passport.initialize());
app.use(passport.session());

db.dbCon();

//passport config
const clientID = "282249366413-tlgi6qubt7s62kl09pkphqjcjdqqu0rh.apps.googleusercontent.com";
const clientSecret = "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";

passport.use('google', new GoogleStrategy({
        clientID : clientID,
        clientSecret : clientSecret,
        callbackURL : 'http://localhost:3000/auth/google',
        // userProfileURL : 'https://www.googleapis.com/oauth2/v3/userinfo'
    }, async (issuer, profile, cb) => {
        console.log('* authenticate ');
        try {
            console.log(issuer);
            console.log(profile);

            //im lazy so username = profile.id, pwd = 'none'
            const username = profile.id;
            const pwd = 'none' 
            let user = await db.findUser(username, pwd);
            
            if (!user) {
                user = await db.addUser(username, pwd);
            }
            return cb(null, user);
        } catch (err){
            console.log(err);
            return cb(err);
        }
    }
));

passport.serializeUser((user, cb) => {
    console.log('* serialize');
    
    console.log(user);
    cb(null, user.username);
});

passport.deserializeUser(async (_username, cb) => {
    console.log('* deserialize');

    try {
        let user = await db.findUser(_username);
        cb(null, user);
    } catch (err){
        cb(err);
    }
})

// middle man redirect after auth
app.get('/auth/google', passport.authenticate('google', {
    session : true,
    failureRedirect : '/login'   
}), (req, res, next) => {
    console.log('> after auth');

    res.redirect('/secret');
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
    //temporary block
    res.redirect('/login');
})

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res, next) => {
    //temporary block 
    res.redirect('/register');
});


app.get('/register/google', passport.authenticate('google', {
    scope: [ 'email' , 'profile' ]
}));

app.get('/logout', (req, res, next) => {
    req.logout({}, err => {
        if (err) return next(err);
        res.redirect('/');
    })
});




module.exports = app;