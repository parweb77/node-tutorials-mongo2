var _ = require('lodash');
var mongoose = require('./../db/mongoose');
var {ObjectID} = require('mongodb');
var {Todo} = require('./../model/todomodel');
var {user} = require('./../model/usermodel');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

const port = process.env.PORT || 3000;

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

app.delete('/todos/:id',(req, res)=>{

    var _id = req.params.id;
    if(!ObjectID.isValid(_id))
        res.status(404).send({error:"ID is invalid. document not deleted"});
    Todo.findOneAndDelete({_id}).then((todo)=>{
        if(todo)
            res.status(200).send(todo);
        else{
            res.status(400).send({error:"document not deleted"});

        }
         

    })
});

app.patch('/todos/:id',(req, res)=>{

    id=req.params.id;
   if(!ObjectID.isValid(id)) 
        res.status(400).send({id:id, error:"invalid ID"});
    
    var body = _.pick(req.body,['text','completed']);

    if (_.isBoolean(body.completed) && body.completed)
        body.completedAt = new Date().getTime();
    else {
        body.completedAt = null;
        body.completed = false;
    }

    Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
        if(!todo)
            res.status(404).send({error:"todo Id not found"});
        res.status(200).send(todo);

    }).catch((e)=> {
        res.status(404).send({error:"updated failed"});
    })

});

app.post('/users',(req,res)=>{

    var body = _.pick(req.body,['username','email','password'])
    // body = {
    //     username:'testuser',
    //     email :'test@gmail.com',
    //     password:'1234567'
    // }
    var newUser = new user(body);
    newUser.save().then((user)=>{
       res.status(400).send({user});
    //    console.log(user);
    })
    .catch((error)=>{
       res.status(400).send({error})
    //    console.log(error);
    })

})

app.listen(port,()=>{
    console.log(`server started on port ${port}`);
});

module.exports.app=app;





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