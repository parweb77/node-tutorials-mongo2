//import { promises } from 'fs';

const mongoose = require ('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
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

UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject,['username','email','_id']);
}

UserSchema.methods.generateAuthToken = function () {

    var user = this;
    var access = 'auth';
    var _id = user._id.toHexString();
    var token = jwt.sign({_id, access},'abc123').toString();
    user.tokens = user.tokens.concat([{access,token}]);
    return user.save().then(()=>{
        return token;
    });
}

UserSchema.statics.findByToken = function (token){
    var user = this;
    var decoded;
    

    try {
        decoded = jwt.verify(token,'abc123');
    } catch(e) {
        e = 'verification failed';
        return Promise.reject(e);
    }

   return user.findOne({
       // email:'post5@gmail.com'
         '_id':decoded._id,
         'tokens.token':token,
         'tokens.access':'auth'
    }).then((selectUser)=>{
        console.log(selectUser); 
        return Promise.resolve(selectUser) ;
    });
    // console.log(result);
    // return result;
  //  return Promise.resolve(selectUser);

}

var user = mongoose.model('users', UserSchema);

module.exports={user};