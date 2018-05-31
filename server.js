var mongoose = require('./db/mongoose');

var {Todo} = require('./model/todomodel');
var {user} = require('./model/usermodel');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.post('/todos',(req, res)=>{

    var newTodo = new Todo({
        text:req.body.text
    });
    newTodo.save().then((result)=>{
        res.send(result)
    },(err)=>{
        res.status(400).send(err);
    });

});



app.listen(3000,()=>{
    console.log('server started on port 3000');
});

// var newTodo = new Todo({
//     text:'cook Dinner'
// });

// var anotherTodo = new Todo({
//     text:'play soccer',
//     Completed:true
// });

// newTodo.save().then((result)=>{
//     console.log ('saved todo item',result);
// }, (e)=>{
//     console.log('data not saved');
// });

// anotherTodo.save().then((result)=>{
//     console.log ('saved todo item',result);
// }, (e)=>{
//     console.log('data not saved');
// });

// var newuser = new user({
//     username : 'tom',
//     email:'tom@gmail.com'
// });

// newuser.save().then((result)=>{
//     console.log ('saved new user',result);
// },(e)=>{
//     console.log('user not saved');
// });

module.exports.app=app;