var mongoose = require('mongoose');

const MongoClient = require('mongodb').MongoClient

const url =   'mongodb://localhost:27017';
const dbName = 'todoApp';
// // Connect using MongoClient
// MongoClient.connect(url, function(err, client) {
//   if (err){
//     console.log('data insert failed');
//     client.close();
//     return err; 
//     } 
//   // Create a collection we want to drop later
//   db=client.db(dbName)
//   const col = client.db(dbName).collection('toDos');
//   // Insert a bunch of documents
//   col.insert([{task:1, by:1}
//     , {task:2, by:2}, {task:3, by:3}
//     , {task:4, by:4}], {w:1}
//     , function(err, result) {    
//     if (err){
//         console.log('data insert failed');
//         client.close();
//         return err; 
//         }    
//   });
// });

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
