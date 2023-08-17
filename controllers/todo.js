const fs =require('fs')
var todoModel=require('../models/todo')


function getalltodos (){
    return todoModel.find().populate('userId')
}

function get_l_s (s,l){
    return todoModel.find().skip(s).limit(l).populate('userId')
}




function savenewtodo(todo){
    console.log(todo);
   return todoModel.create(todo)
}


function deletetodo(id){
    return todoModel.findByIdAndDelete(id,{new:true}).populate('userId')
}




function gettodobyid(id){
    return todoModel.findOne({_id:id}).populate('userId')
}


function updatetodo(id , title,updatedat){
   return todoModel.findByIdAndUpdate(id,{title:title,updatedat:updatedat},{new:true}).populate('userId')
}
module.exports={getalltodos,savenewtodo,gettodobyid,updatetodo,deletetodo,get_l_s}