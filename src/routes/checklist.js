const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    console.log ('olá')
    res.send()
})
router.post('/', (req, res)=>{
    console.log(req.body)
    res.status(200).json(req.body)
})

router.get('/:id', (req,res)=>{
    console.log (req.params)
    res.send(`ID: ${req.params.id}`)
})

router.put('/:id',(req,res)=>{
    console.log(`put ID: ${req.params.id}`)
    res.send(`put ID: ${req.params.id}`)
})

router.delete('/:id',(req,res)=>{
    console.log(`delete ID: ${req.params.id}`)
    res.send(`delete ID: ${req.params.id}`)
})


module.exports=router