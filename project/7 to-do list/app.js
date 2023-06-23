// === DATABASE ===
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/';
const dbName = 'test1';
const connectionProps = {
    useNewUrlParser: true,
}

mongoose.connect(url + dbName).then(() => {
    console.log('database connected');
})


let taskSchema = new mongoose.Schema({
    taskData : {
        type: String,
        required: true,
        // unique: true,
    }
})

function insertData(collectionName, data){
    let taskCollection = mongoose.model(collectionName, taskSchema, collectionName);
    
    taskCollection.insertMany(data).then(() => {
        console.log('insert data done');
    });
 
}

function getData(collectionName){
    return new Promise((resolve, reject) => {
        let taskCollection = mongoose.model(collectionName, taskSchema, collectionName);

        taskCollection.find({}).then(cols => {
            console.log('data found');
            resolve(cols);
        });
    })
}

// setTimeout(() => {
//     mongoose.disconnect().then(() => {
//         console.log("client disconnected");
//     });
// }, 2000);

// === WEB ===
let express = require('express');
let bodyParser = require('body-parser');
let ejs = require('ejs');
let date = require(__dirname + '/date.js');

let app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

function print(stuff){
    console.log(stuff);
}

// let taskList = ['send nudes'];
let taskListWork = ['essay'];

// main page
app.get('/', async (req, res) => {
    let curDate = date.getDay();
    let taskList = await getData('taskNormal');
    // console.log(taskList); 
    res.render('index', {headingTitle:curDate, taskExtra:taskList, actionType:'/'});
});

app.post('/', async (req, res) => {
    await insertData('taskNormal',req.body);
    // console.log(req.body);
    // taskList.push(req.body.taskData);
    res.redirect('/');
});

// work 
app.get('/work', async (req, res) => {
    let taskList = await getData('taskWork');
    res.render('index', {headingTitle:'Work', taskExtra:taskList, actionType:'/work'});
});

app.post('/work', async (req, res) => {
    await insertData('taskWork',req.body);
    res.redirect('/work');
});

let port = 3000;
app.listen(port, () => {
    console.log('Listening on port ' + port);
})

