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

let taskList = ['send nudes'];
let taskListWork = ['essay'];

// main page
app.get('/', (req, res) => {
    //get date
    let curDate = date.getDay();
    res.render('index', {headingTitle:curDate, taskExtra:taskList, actionType:'/'});
});

app.post('/', (req, res) => {
    taskList.push(req.body.newTask);
    res.redirect('/');
});

// work 
app.get('/work', (req, res) => {
    res.render('index', {headingTitle:'Work', taskExtra:taskListWork, actionType:'/work'});
});

app.post('/work', (req, res) => {
    taskListWork.push(req.body.newTask);
    res.redirect('/work');
});



let port = 3000;
app.listen(port, () => {
    console.log('Listening on port ' + port);
})

