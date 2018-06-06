var {user} = require('./../model/usermodel');

function authenticate(req,res,next) {

    var token = req.header('x-auth');
    user.findByToken(token).then((selectUser)=>{

        if(!selectUser){            
            e='user not found';
            return Promise.reject(e);
        }
        req.user = selectUser ;
        req.token = token;    
        next();
    }).catch((e)=>{
        res.status(400).send({e});
    });

}

module.exports = {authenticate};