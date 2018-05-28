var mongoose = require ('mongoose');

const {MongoClient, ObjectID} = require('mongodb');

const url =   'mongodb://localhost:27017';
const dbName = 'todoApp';

MongoClient.connect(url,(err, client)=>{
    if(err){
        console.log('unable to connnect to the database');
    }

    const col = client.db(dbName).collection('toDos');
    col.findOneAndUpdate({
        _id:new ObjectID('5b0bdc02333ff01ea0d7d44a')
    },{$inc: {task:2}},{returnOriginal:false}).then((result)=>{
        console.log(result);
    });
});