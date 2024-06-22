const express = require('express')
const router = express.Router()

router.get('/tesk', (req, res) => {
    res.send({
        status : "hello"
    })
})


const mongoose = require('mongoose')
const tasks = [ 
    {
        is : 1,
        name : "Tast 1",
        completed : false
    },
    {
        is : 2,
        name : "Tast 2",
        completed : false
    },
    {
        is : 3,
        name : "Tast 3",
        completed : false
    }
];
router.get('/api/task', (req, res) => {
    res.status(200).json({
        message : tasks
    })
})

router.post('/create/task', (req, res) => {
    const { error } = utils.validateTask(req.body)
    if(error) return res.status(400).send("the name should be at leats 3 char long")
    console.log('fghj');
    const task = {
        id : tasks.length + 1,
        name : req.body.name,
        completed : req.body.completed
    };
    tasks.push(task)
    req.status(201).send(task)
})


module.exports = router;