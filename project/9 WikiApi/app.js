// ==== BE ====
const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/';
const dbName = 'wikiDb';



async function dbCon(){
    console.log('> db connect');
    const conOpt = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    return mongoose.connect(url + dbName, conOpt).then(() => {
        console.log("Db connected");    
        return 200;
    }).catch(err => {
        throw err;
    })
}

async function colCon(){
    console.log("> collection connect");
    const articleScheme = {
        title: {
            type: String,
            unique: true,
            required: true,
        },
        
        content: { 
            type: String,  
        }
    }
    const colName = 'articles';

    return mongoose.models[colName] || mongoose.model(colName, new mongoose.Schema(articleScheme), colName);
}

async function insertData(_title, _content){ 
    console.log('> insert data');

    return colCon().then(async model => {
        return model.create({
            title : _title,
            content : _content,
        }).then(() => {
            return 'Insert done';
        }).catch (err => {
            throw err;
        });
    }).catch(err => {
        throw err;
    })   
}

async function getData(docName = "what"){
    console.log('> get data');

    return colCon().then(async model => {
        const docs = await model.find({}).cursor().toArray();
        return docs;
    }).catch(err => {
        throw err;
    })
}

(async () => {
    await dbCon(); 
})();   


// ==== FE ==== 
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");  

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get('/articles', async (req, res, next) => {
    getData().then(docs => {
        res.send(docs);
    }).catch(err => {
        next(err);
    })   
});

app.post('/articles', async (req, res, next) => {
    console.log(req.body);
    insertData(req.body.title, req.body.content).then(doc => {
        res.send(doc);
    }).catch(err => {
        next(err);
    });
    // res.send('send nudes');
});

const port = 3000;
app.listen(port, () => {
    console.log('listening on port:' + port);
})