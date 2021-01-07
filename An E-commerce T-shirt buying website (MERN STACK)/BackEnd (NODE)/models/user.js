const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
const { functions } = require('lodash');

var userSchema = new Schema({
    name:{
        type: String,
        required: true,
        maxlength:40,
        trim: true
    },
    lastname:{
        type:String,
        maxlength:32,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    userinfo:{
        type: String,
        trim: true,
    },
    // TODO: come back here
    encry_password:{
        type:String,
        required: true
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    purchases:{
        type:Array,
        default:[]
    }
},{timestamps: true}
);

userSchema.virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password);
    }
    )


userSchema.methods = {

    autheticate:   function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password
    },

    securePassword: function(plainpassword){
        if (!plainpassword) return "";
        try{
            return crypto.createHmac('sha256',this.salt)
            .update(plainpassword)
            .digest('hex');
        }catch (err) {
            return "" ;
        }
    }
}

module.exports = mongoose.model("User",userSchema);