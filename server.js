var mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo',{
    text:{
        type: String
    },
    completed : {
        type : Boolean
    },
    completedAt: {
        type : Number
    }
});

var user = mongoose.model('user',{
    username:{
        type:String,
        require:true,
        minlength:1,
    },
    email :{
        type:String,
        require:true,
        minlengt:1,
        trim:true
    }
})
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

var newuser = new user({
    username : 'parvese',
    email:'parvese@gmail.com'
});

newuser.save().then((result)=>{
    console.log ('saved new user',result);
},(e)=>{
    console.log('user not saved');
});