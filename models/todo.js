const mongoose = require('mongoose')
var todoSchema = mongoose.Schema({
    title: {
        type: String,
        minlength: [5,"min length is 5"],
        maxlength: [20,"max length is 20"],
        required: true,
        
    },
    status: {
        type: String,
        enum: ["to-do", "in progress", "done"],
        default: "to-do"
    },
    userID:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    },
    createdat:{
        type:Date,
    },
    updatedat:{
        type:Date,
    }
})

var todoModel =mongoose.model('todo',todoSchema)
module.exports=todoModel