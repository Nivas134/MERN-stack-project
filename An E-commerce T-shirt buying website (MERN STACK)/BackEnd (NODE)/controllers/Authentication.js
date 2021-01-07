const User = require("../models/user");
const {check, validationResult}  = require('express-validator');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt')


signup = (req,res) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()[0].msg})
    }    

    const user = new User(req.body)
    user.save((err,user)=>{
        if(err){
            return console.log(err)
        }
        res.send(user.name);
    });
};

signin = (req,res) =>{

    //Destructuring email and password from body directly
    const {email, password} = req.body;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()[0].msg})
    }

    User.findOne({email},(err,user)=>{
        if(err || !user){
           return res.status(400).json({
                error: "Emial does not exists"
            });
        }
        //Authenticating the user password
        if(!user.autheticate(password)){
            return res.status(401).json({
                error: "Email and password do not match"
            })
        }
    //Creating a token using jsonwebtoken
    const token = jwt.sign({_id: user._id}, "sahhhhhh")     
    
    //put token into the cookie using express-jwt
    res.cookie("token",token,{expire: new Date() + 9999});

    //send respose to the front-end by deconstructing
    const{_id, name, email, role} = user;
    return res.json({token, user:{_id, name, email, role}})
    })
    
};

signout = (req,res) =>{
    res.clearCookie("token");
    res.json({
        message : 'User signed out successfully'
    })
};

//protected routes
isSignedin = exjwt({
    secret: "sahhhhhh",
    userProperty: "auth"
});


//custom middewares
isAuthenticated = (req,res,next)=>{
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error: "ACCESS DENIED...!"
        })
    }
    next();
}

isAdmin = (req,res, next)=>{
    if(req.profile.role == 0){
        return res.status(403).json({
            error: "Your are not an ADMIN"
        })
    }
    next();
}

module.exports = {signout,signup,signin, isSignedin, isAuthenticated, isAdmin};