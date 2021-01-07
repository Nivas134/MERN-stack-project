const User = require('../models/user');
const Order = require('../models/order')

exports.getUserById = (req, res, next, id) =>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "No user found"
            })
        }
        req.profile = user;
        next();
        })
}

exports.getUser = (req,res,next) =>{
    //TODO: back for a password
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return  res.json(req.profile)
}


exports.updateUser = (req,res) =>{
    User.findByIdAndUpdate({_id:req.profile._id},
        {$set:req.body},
        {new:true, useFindAndModify:false},
        (err,user)=>{
            if(err){
                return res.status(400).json({
                    error: "Your not authorized to update this user information"
                })
            }
            res.json(user)
        })
}

// An assignment
exports.allusers=(req,res)=>{
User.find({User},(err,userall)=>{
    if(err){
        return res.status(404).json({
            error: err
        })
    }
    res.json(userall)
})
}

exports.userPurchaseList=(req,res)=>{
    Order.find({user: req.profile._id})
    .populate("user", "_id name")
    .exec((err,order)=>{
        if (err){
            return res.status(400).json({
                error: "No order in this account"
            })
        }
        return res.json(order);
    })
}

exports.pushOrderInPurchaseList = (req,res,next) =>{

    let purchases = []
    req.body.order.products.forEach(product =>{
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        })
    })

    //store in DB
    User.findOneAndUpdate({_id: req.profile._id},
        {$push: {purchases:purchases}},
        {new: true},
        (err,purchases)=>{
            if (err) {
                return res.status(400).json({
                    error: "Unable to save purchase List"
                })
            }
        })
    next()
}