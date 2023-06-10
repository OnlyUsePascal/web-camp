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

async function getData(_title){
    console.log('> get data');

    const condition = (_title) ? {title : _title} : {};
    return colCon().then(async model => {
        const docs = await model.find(condition).cursor().toArray();
        return docs;
    }).catch(err => {
        throw err;
    })
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

async function putData(_title = '', newData = {}){
    console.log('> put data');

    const condition = {title : _title};
    return colCon().then(async model => {
        return model.findOneAndReplace(
            condition, 
            newData,
            {
                returnDocument : 'after',
                strict : false
            }
        ).then(doc => {
            return doc;
        }).catch(err => {
            throw err;
        })
    }).catch(err => {
        throw err;
    })
}

async function patchData(_title = '', newData = {}){
    console.log('> patch data');

    const condition = {title : _title};
    return colCon().then(async model => {
        return model.findOneAndUpdate(
            condition, 
            newData,
            {
                returnDocument : 'after',
                strict: false
            }
        ).then(doc => {
            return doc;
        }).catch(err => {
            throw err;
        })
    }).catch(err => {
        throw err;
    })
}

async function deleteData(_title = ''){
    console.log('> delete data');

    const condition = {title : _title};
    return colCon().then(async model => {
        return model.deleteMany(condition).then(result => {
            return result;
        }).catch (err => {
            throw err;
        })
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


app.route(`/articles`)
    .get(async (req, res, next) => {
        getData().then(docs => {
            res.send(docs);
        }).catch(err => {
            next(err);
        })
    })

    .post(async (req, res, next) => {
        console.log(req.body);
        insertData(req.body.title, req.body.content).then(docs => {
            res.send(docs);
        }).catch(err => {
            next(err);
        });
        // res.send('send nudes');
    })
    
    .delete(async (req, res, next) => {
        deleteData().then(result => {
            res.send(`Deleted ${result} document`);
        }).catch(err => {
            next(err);
        })
    });


app.route(`/articles/:title`)
    .get(async (req, res, next) => {
        getData(req.params.title).then(docs => {
            res.send(docs);
        }).catch(err => {
            next(err);
        })
    })
    
    .put(async (req, res, next) => {
        putData(req.params.title, req.body).then(result => {
            res.send(result);
        }).catch(err => {
            next(err);
        })
    })

    .patch(async (req, res, next) => {
        patchData(req.params.title, req.body).then(result => {
            res.send(result);
        }).catch(err => {
            next(err);
        })
    })

    .delete(async (req, res, next) => {
        deleteData(req.params.title).then(result => {
            res.send(result);
        }).catch(err => {
            next(err);
        })
    });



const port = 3000;
app.listen(port, () => {
    console.log('listening on port:' + port);
})

