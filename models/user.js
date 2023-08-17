const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var userSchema =mongoose.Schema({
    username:{
        type:String,
        require :true,
        unique:[true,'username already exist'],
        // minlength:[8,'min length is 8'],
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true
    },
    firstname:{
        type: String,
        required: false,
        // minlength: [3,"min length is 3"],
        // maxlength: [15,"max length is 15"]
    },
    lastname:{
        type: String,
        required: false,
        // minlength: [3,"min length is 3"],
        // maxlength: [15,"max length is 15"]
    },
    dob:{
        type: Date,
        require:false
    },
    createdat:{
        type:Date,
    },
    updatedat:{
        type:Date,
    }
})
userSchema.pre('save',async function(next){
    var salt =await bcrypt.genSalt(10)
    var hashedpass=await bcrypt.hash(this.password,salt)
    this.password=hashedpass
    next()
})
var userModel =     mongoose.model('user',userSchema)
module.exports=userModel