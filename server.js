var mongoose = require('./db/mongoose');
var {ObjectID} = require('mongodb');
var {Todo} = require('./model/todomodel');
var {user} = require('./model/usermodel');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.post('/todos',(req, res)=>{

    var newTodo = new Todo({
        text:req.body.text,
        _id:new ObjectID(req.body._id)
    });
    newTodo.save().then((result)=>{
        res.send(result)
    },(err)=>{
        res.status(400).send(err);
    });

});

app.get('/todos', (req, res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    }).catch((e)=> res.send({"text":"Data get error"}));
});

app.get('/todos/:ids', (req, res)=>{
    var id = req.params.ids;
 //   console.log(id);
    
    if(!ObjectID.isValid(id)){
        var e ={error:'Invalid Object ID'};
        return res.status(404).send(e);
    }

    Todo.findById(id).then((todo)=>{
        if(!todo) {
            var e ={error:'ID not found'};
            res.status(400).send(e);
        }
        else {
          //  var test = {text:'this is test object'}
            res.status(200).send({todo});
        }        
    })
    .catch((e)=>{
        var e ={error:'Error fetching the database'};
        res.status(400).send(e); 
    })
});





    // const todo = [{text:'my first todo'},
    //         {text:'my second to do'}];
    // Todo.insertMany(todo) 
    // .then(()=>console.log('data inserted'));



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