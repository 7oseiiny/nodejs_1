const fs =require('fs')
var userModel=require('../models/user')
var todoModel=require('../models/todo')


function getallusers (){
    return userModel.find()
}


function deleteuser(id){
    return userModel.findByIdAndDelete(id,{new:true})
}


function savenewuser(user){
   return userModel.create(user)
}




function getuserbyid(id){
    return userModel.findOne({_id:id})
}

function getuserbyid_todo(id){
    return todoModel.find({userId:id})
}


function updateuser(id , firstname,updatedat){
   return userModel.findByIdAndUpdate(id,{firstname:firstname,updatedat:updatedat},{new:true})
}
module.exports={getallusers,savenewuser,getuserbyid,updateuser,deleteuser,getuserbyid_todo}