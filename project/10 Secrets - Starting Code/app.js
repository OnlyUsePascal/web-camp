const db = require('./appBack.js'); 

//connect db
(async () => {
    await db.dbCon();
})();


// ==== fe ====  
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");  
const { dbCon } = require("./appBack");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get('/', (req, res, next) => {
    res.render('home');        

});

app.route('/login')
    .get((req, res, next) => {
        res.render('login');        
    })
    
    .post((req, res, next) => {
        db.findUser(req.body.username, req.body.pwd).then(result => {
            if (result) {
                res.render('secrets');
            } else {
                res.send('fuck no');
            }
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


const port = 3000;
app.listen(port, () => {
    console.log('listening on port:' + port);
})


