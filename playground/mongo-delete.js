var mongoose = require('mongoose');

const MongoClient = require('mongodb').MongoClient

const url =   'mongodb://localhost:27017';
const dbName = 'todoApp';

// MongoClient.connect(url, function (err, client){
//     if (err){
//         console.log('connection failed');
//     }
    
//     const col=client.db(dbName).collection(  );
//     col.deleteOne({by:'parvese'}).then((result)=>{
//         console.log(result);
//         client.close();
//     },(err)=>{
//         console.log('unable to delete Data');
//     });
    
// });


MongoClient.connect(url,function(err,client){
    if(err){
        console.log(err);
        return err;
    }
    const col = client.db(dbName).collection('toDos');
    console.log('connected to client');
    col.deleteOne({by:'test2'}).then((result)=>{
        console.log (result);
        client.close();
    }).catch((err)=>{
        console.log('unable to delete Data');
    });
});
