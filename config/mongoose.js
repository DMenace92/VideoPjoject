const { connect } = require('mongodb');
const mongoose = require('mongoose')
const url = `mongodb://127.0.0.1:27017/VUPAPI`;
// mongoose.connect(url, {useNewUrlParser: true});
const connectMongo = async ()=>{
    try{
        await mongoose,connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
    }catch(e){
        console.log(e);
        throw e
    }
}
module.exports = connectMongo

// look in https://github.com/krishna-y2000/Uploading-file-with-grid-fs-and-jwt-authentication/blob/master/config/db.js

// more Docs form DEVSechhols https://dev.to/shubhambattoo/uploading-files-to-mongodb-with-gridfs-and-multer-using-nodejs-5aed