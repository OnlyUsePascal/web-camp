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
        // pwd : cryptoJs.SHA256(_pwd).toString(), //1 time hash
        pwd : await bcrypt.hash(_pwd, parseInt(process.env.SALTRND)), //hash + salt + many time
    }).then(() => {
        return 'Insert done';
    });
}

const findUser = (_username, _pwd) => {
    console.log('> Find user');

    const model = colCon();
    const condition = {
        username : _username,
    };

    return model.findOne(condition)
        .then(doc => {
            if (doc === null) return false;
            return bcrypt.compare(_pwd, doc.pwd); //hash + salt + many time
            // return doc.pwd === cryptoJs.SHA256(_pwd).toString(); //1 time hash

    });
}




module.exports = {dbCon, 
    colCon, 
    addUser,
    findUser,
};









