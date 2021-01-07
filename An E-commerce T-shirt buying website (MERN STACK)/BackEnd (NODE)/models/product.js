const mongoose = require('mongoose')
const { stringify } = require('uuid')
const category = require('./category')
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
        trim : true,
        maxlength : 40
    },
    description : {
        type : String,
        required : true,
        maxlength : 1000,
        trim : true
    },
    price:{
        type : Number,
        required : true,
    },
    category : {
        type : ObjectId,
        ref : "Category",
        required : true
    },
    
    stock : {
        type : Number
    },
    sold : {
        type: Number,
        default : 0
    },
     photo : {
         data: Buffer,
          contentType : String
     }
},{timestamps : true})

module.exports = mongoose.model("Product", productSchema);