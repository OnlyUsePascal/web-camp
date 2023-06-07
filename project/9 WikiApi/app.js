// ==== BE ====
const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/';
const dbName = 'wikiDb';



function dbCon(){
    const conOpt = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    return new Promise((res, rej) => {
        mongoose.connect(url + dbName, conOpt).then(() => {
            console.log("Db connected");
            res(100);
        }).catch(() => {
            console.log("Something went wrong");
            res(404);
        })
    })
}

async function colCon(){
    console.log("> collection connect");
    const articleScheme = {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        
        content: {
            type: String,
        }
    }
    const colName = 'articles';

    let col = await mongoose.connection.db.listCollections({name : colName}).next();
    if (col !== null){
        return mongoose.connection.db.collection(colName);
    }

    let col2 = mongoose.model(colName, articleScheme, colName);
    return col2;
}


async function insertData(title, content){ 
    console.log("> insert data")
    const model = await colCon();

    model.insertMany([{title, content}]).then(() => {
        console.log("insert done");
    }).catch(() => {
        console.log('something gone wrong');
    });
}

(async () => {
    await dbCon();
    colCon();
    insertData(); 
    // console.log(22);
})();   


// ==== FE ====
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

