const express =require('express')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var {promisify}=require('util')

var router=express.Router()
const fs = require('fs')
const userModel = require('../models/user');
var { getallusers, savenewuser, getuserbyid, updateuser,deleteuser ,getuserbyid_todo} = require('../controllers/user');
const { log } = require('console');



router.get("/", async (req, res) => {

    try {
        var users = await getallusers()
        res.json({ data: users })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
//add

router.post("/signup", async (req, res) => {
    var user = req.body
    user.createdat= Date.now()
    try {
        var newuser = await savenewuser(user)

        res.status(201).json({ data: newuser })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


router.post("/login", async (req, res) => {
    var{email,password}=req.body

    if (!email||!password) {
        res.send({message:'pls provide email and pass'})
    }
    else{
        var user =await userModel.findOne({email:email})
        if (!user) {
            res.send({message:'invalid email or pass'})
        }
        else{
            var isvalid =await bcrypt.compare(password,user.password)
            if (!isvalid) {
                res.send({message:'wrong pass'})
            }
            else{
                var token = jwt.sign({userID:user.id,name:user.username},process.env.SECRET)
                // var decoded= await promisify(jwt.verify) (token,process.env.SECRET)
                // console.log(decoded);
                res.send({token:token,status:'success'+process.env.SECRET})

            }
        }
    }
})

router.get("/:id", async (req, res) => {

    var id = req.params.id
    console.log(req.params);

    try {
        var user = await getuserbyid(id)

        if (user) {
            res.status(200).json({ data: user })
        }
        else {
            res.status(404).json({ message: `${id} not found` })
        }
    } catch (err) { res.status(404).json({ message: `${id} not found` }) }
})

router.get("/:id/todo", async (req, res) => {
            console.log("id");
        
            var id = req.params.id
            try {
                var user = await getuserbyid_todo(id)
        
                if (user) {
                    res.status(200).json({ data: user })
                }
                else {
                    res.status(404).json({ message: `${id} not found` })
                }
            } catch (err) { res.status(404).json({ message: `${id} not found` }) }
})



// ///////

//////

router.patch("/:id",async (req, res) => {
    var firstname = req.body.firstname
    const id = (req.params.id)
    updatedat= Date.now()

    try{
        var user = await updateuser(id, firstname,updatedat)

    res.status(200).json({ data: user })
    }catch{
        res.status(404).json({ message: `${id} not found` })
    }

})




router.delete("/:id", async(req, res) => {

    var id = req.params.id
    console.log(id);

    try {
        var user = await deleteuser(id)

        if (user) {
            res.status(200).json({ data: user })
        }
        else {
            res.status(404).json({ message: `${id} not found` })
        }
    } catch (err) { res.status(404).json({ message: `${id} not found` }) }
})



module.exports = router 