var mongoose = require('mongoose');

const MongoClient = require('mongodb').MongoClient

const url =   'mongodb://localhost:27017';
const dbName = 'todoApp';

MongoClient.connect(url, function (err, client){
    if (err){
        console.log('connection failed');
    }
    
    const col=client.db(dbName).collection('toDos');
    col.find({by:'parvese'}).toArray().then((doc)=>{
        console.log(JSON.stringify(doc,undefined,2));
        client.close();
    },(err)=>{
        console.log('unable to fetch Data');
    });
    
});
