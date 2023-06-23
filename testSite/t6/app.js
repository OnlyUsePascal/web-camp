//mongoose
const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/";
const dbName = "test1";
const connectionProps = {
    useNewUrlParser: true,
};

mongoose.connect(url + dbName).then(() => {
    console.log("mongo client connected");
});

const dataSchema = new mongoose.Schema({
    data : {
        type: String,
        required: true,
        unique: true,
    }
})
const dataName = 'Data';
const Data = mongoose.model(dataName, dataSchema, dataName);

function insertData(dataInfo){
    Data.insertMany(dataInfo).then(() => {
        console.log('insert done');
    }).catch(console.dir);
}

function getData(){
    return new Promise((resolve, reject) => {
        Data.find({}).then(cols => {
            console.log('data found');
            resolve(cols);
        })
    })

}

// insertData({data: 'joun'});
// getData();

// setTimeout(() => {
//     mongoose.disconnect().then(() => {
//         console.log("client disconnected");
//     });
// }, 2000);

// WEB===
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// GET===
app.get('/', async (req, res) => {
    let dataList = await getData();
    console.log(dataList);
    res.render('main', {username:'joun', dataList: dataList});
});

// POST===
app.post('/', async (req, res) => {
    console.log(req.body);
    await insertData(req.body);
    res.redirect('/');
})

const port = 3000;
app.listen(port, () => {
    console.log('Listening on port ' + port);
});
