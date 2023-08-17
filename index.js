const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
var todoRoutes =require('./routes/todo')
var userRoutes =require('./routes/user')
var app = express()

//gate
app.use(cors(
    {
        origin:'*'
    }
))
 
app.use(express.json())
app.use('/todo',todoRoutes)
app.use('/user',userRoutes)

app.use('*',function(req,res,next){
    res.send({message:"not found"})
    next();

})
app.use(function(err,req,res,next){
    res.send({message:"something went wrong !"})
    next();

})

mongoose.connect("mongodb://127.0.0.1:27017/todoDB").then(()=>{console.log("connect pass");})
app.listen(3000, _ => { console.log("ok"); })
