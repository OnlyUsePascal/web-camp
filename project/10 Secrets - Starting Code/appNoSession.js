const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");  
const db = require('./database.js'); 

// --- CONFIG ---
//encode config
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

db.dbCon();

app.get('/', (req, res, next) => {
    res.render('home');        
});

app.route('/login')
    .get((req, res, next) => {
        res.render('login');        
    })
    
    .post((req, res, next) => {
        db.findUser(req.body.username, req.body.pwd).then(user => {
            if (!user)
                return res.send('fuck no');
            res.render('secrets');
        }).catch(err => {
            next(err);
        });
    });

app.route('/register')
    .get((req, res, next) => {
        res.render('register');        
    })

    .post((req, res, next) => {
        db.addUser(req.body.username, req.body.pwd).then(result => {
            res.render('secrets');
        }).catch(err => {
            next(err);
        })
    });



module.exports = app;
