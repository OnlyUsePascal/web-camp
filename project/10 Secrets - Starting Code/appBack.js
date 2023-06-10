const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/';
const dbName = 'secretDb';

const dbCon = () => {
    console.log('> Db connect');
    
    const conOpt = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    return mongoose.connect(url + dbName).then(() => {
        console.log('Db connected');
        return 200;
    }).catch (err => {
        throw err;
    })
}

const colCon = () => {
    console.log('> Collection connect');

    //user
    const colSchema = {
        username : {
            type : String,
            unique : true,
            required : true,
        }, 

        pwd : {
            type : String,
            required : true,
        }
    };
    const colName = 'user';
    
    return mongoose.models[colName] || mongoose.model(colName, new mongoose.Schema(colSchema), colName); 
}

const addUser = (_username, _pwd) => {
    console.log('> Add user');

    const model = colCon();
    return model.create({
        username : _username,
        pwd : _pwd,
    }).then(() => {
        return 'Insert done';
    });
}

const findUser = (_username, _pwd) => {
    console.log('> Find user');

    const model = colCon();
    const condition = {
        username : _username,
        pwd : _pwd,
    };

    return model.findOne(condition)
        .then(doc => {
            // console.log(doc);
            return doc !== null;
    });
}


module.exports = {dbCon, 
    colCon, 
    addUser,
    findUser,
};









