const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');
const cryptoJs = require('crypto-js');
const bcrypt = require('bcrypt');
require('dotenv').config();

const url = 'mongodb://127.0.0.1:27017/';
const dbName = 'secretDb';

//connect db
const dbCon = () => {
    console.log('> Db connect');
    
    const conOpt = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    return mongoose.connect(url + dbName).then(() => {
        console.log('Db connected');
        return 200;
    });
}

//connect collection
const colCon = () => {
    console.log('> Collection connect');

    //user schema
    const colSchema = new mongoose.Schema({
        username : {
            type : String,
            unique : true,
            required : true,
        }, 

        pwd : {
            type : String,
            required : true,
        }
    });
    const colName = 'user';

    //enable field encryption 
    // let secret = process.env.SECRET; 
    // colSchema.plugin(encrypt, {secret : secret, }); 

    return mongoose.models[colName] || mongoose.model(colName, colSchema, colName); 
}

const addUser = async (_username, _pwd) => {
    console.log('> Add user');

    const model = colCon();
    return model.create({
        username : _username,
        pwd : await bcrypt.hash(_pwd, parseInt(process.env.SALTRND)), //hash + salt + many time
    }).then(user => {
        return user;
    });
}

const findUser = (_username, _pwd) => {
    console.log('> Find user');
    console.log(_username + " " + _pwd);


    const model = colCon();
    const condition = {
        username : _username,
    };

    return model.findOne(condition)
        .then(async user => {
            if (_pwd === null) return user; 
            if (!user || !(await bcrypt.compare(_pwd, user.pwd))) return null;
            return user; 
    });
};


module.exports = {dbCon, 
    colCon, 
    addUser,
    findUser,
};









