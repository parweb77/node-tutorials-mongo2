const mongoose = require ('mongoose');
const validator = require('validator');

var user = mongoose.model('users',{
    username:{
        type:String,
        require:true,
        minlength:1,
    },
    email :{
        type:String,
        require:true,
        minlength:1,
        trim:true,
        unique:true,
        validate :{
            validator:validator.isEmail,
            message : '{VALUE} is not a valid email'
        }
    },
    password:{
        type:String,
        required:true,
        minlength: true,             
    },
    tokens:[{
        access:{
            type:String,
            required:true 
        },           
        token:{
            type:String,
            required:true
        }

    }]  
});

module.exports={user};