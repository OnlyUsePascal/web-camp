// === BE ===
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const url = "mongodb://127.0.0.1:27017/"; 
const dbName = "webBootCamp";
const connectionProps = {
    useNewUrlParser:true,
};

function initDatabase(){
    return new Promise((resolve, reject) => {
        mongoose.connect(url + dbName, connectionProps).then(() => {
            console.log("Database Connected");
            resolve(200);
        });

    })
}

const taskSchema = new Schema({
    content: {
        type: String,
        required: true,
        unique: true,
    }
})

async function insertTask(taskListName, taskContent){
    if (!taskListName || !taskContent) {
        console.log("Invalid input");
        return;
    }

    const taskModel = mongoose.model(taskListName, taskSchema, taskListName);
    const newTask = new taskModel({
        content: taskContent
    });

    await newTask.save().then(() => {
        console.log("Data inserted");
    }).catch(err => {
        console.log("Something gone wrong");
    });
}

async function getTaskList(taskListName){
    const taskListIter = mongoose.connection.db.collection(taskListName).find();
    const taskList = await taskListIter.toArray();
    // taskList.forEach(task => {
    //     console.log(task._id);
    // })
    return taskList;
}


async function removeTask(taskListName, taskId){
    if (!taskListName || !taskId) {
        console.log("Invalid input");
        return;
    }
    
    const taskList = mongoose.connection.db.collection(taskListName);
    await taskList.deleteOne({_id : new mongoose.Types.ObjectId(taskId)}).then(() => {
        console.log("Data deleted");
    }).catch(err => {
        console.log("Something gone wrong");
    });
}

(async () => {
    await initDatabase();
})();



// === FE ===
const express = require('express');
const bodyParser = require ('body-parser');
const ejs = require('ejs');
const { transferableAbortController } = require("util");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set("view engine", "ejs");

const indexPg = "index";
const choreList = [];
choreList.push("lau nha");
choreList.push("quet cua");

app.get('/', (req, res) => {
    res.redirect("/default");
    // res.render(indexPg, {header: "default", choreList: choreList});
});



app.get("/:header", async (req, res) => {
    const header = req.params.header;
    const taskList = await getTaskList(header);
    console.log("cur page:" + header);
    res.render(indexPg, {header: header, taskList: taskList});
});

app.post("/:header/add", async (req, res) => {
    const header = req.params.header;
    const taskExtra = req.body.taskExtra;

    await insertTask(header, taskExtra);
    res.redirect("/" + header);
});

app.post("/:header/remove", async (req, res) => {
    const taskListName = req.params.header;
    const taskId = req.body._id;

    await removeTask(taskListName, taskId);
    res.redirect("/" + taskListName);
});


let port = 3000; 
app.listen(port, () => {
    console.log("Listening on port: " + port);
});