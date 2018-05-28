var mongoose = require ('mongoose');
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
});

module.exports={user};