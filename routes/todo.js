const express = require('express')
const auth = require('../middlewares/auth')

var router = express.Router()
const fs = require('fs')
var { getalltodos, savenewtodo, gettodobyid, updatetodo ,deletetodo,get_l_s} = require('../controllers/todo')


//get
// router.get("/", (req, res) => {
//     console.log(req.query);
//     var todos = JSON.parse(fs.readFileSync('data.json', 'utf-8'))
//     var list =[]
//     const limit = parseInt(req.query.limit)
//     const skip = parseInt(req.query.skip)
//     console.log(limit);
//     console.log(skip);

//     for (let i = skip; i < skip+limit; i++) {
//         list.push(todos[i])

//     }
//     res.json({ data: list })

// })

router.get("/", async (req, res) => {

    try {
        var todos = await getalltodos()
        res.json({ data: todos })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// router.get("/", async(req, res) => {
//     console.log(req.query);
//     const limit = parseInt(req.query.limit)
//     const skip = parseInt(req.query.skip)

//     try {
//         var todos = await get_l_s(skip,limit)
//         res.json({ data: todos })
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }

// })
//add

router.post("/",auth, async (req, res) => {
    var todo = req.body
    todo.userID=req.userID
    todo.createdat= Date.now()
    // console.log(todo);

    try {
        var newtodo = await savenewtodo(todo)

        res.status(201).json({ data: newtodo })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get("/:id", async (req, res) => {
    console.log("id");

    var id = req.params.id
    try {
        var todo = await gettodobyid(id)

        if (todo) {
            res.status(200).json({ data: todo })
        }
        else {
            res.status(404).json({ message: `${id} not found` })
        }
    } catch (err) { res.status(404).json({ message: `${id} not found` }) }
})

router.patch("/:id",async (req, res) => {
    var title = req.body.title
    const id = (req.params.id)
    updatedat= Date.now()

    try{
        var todo = await updatetodo(id, title,updatedat)

    res.status(200).json({ data: todo })
    }catch{
        res.status(404).json({ message: `${id} not found` })
    }

})





router.delete("/:id", async(req, res) => {
    console.log("id");

    var id = req.params.id
    try {
        var todo = await deletetodo(id)

        if (todo) {
            res.status(200).json({ data: todo })
        }
        else {
            res.status(404).json({ message: `${id} not found` })
        }
    } catch (err) { res.status(404).json({ message: `${id} not found` }) }
})


module.exports = router 