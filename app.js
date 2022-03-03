const express = require('express')

const app = express()

app.listen(3000,()=>{
    console.log("servidor iniciado")
})

app.use(express.json())

const log = (req, res, next)=>{
    console.log(req.body)
    console.log(`Data:`)
    next()
}

app.use(log)

app.get ('/', (req, res)=>{
    res.end('<h1>Minha lista de tarefas</h1>')
})

app.get('/json', (req,res)=>{
    res.json({
        title: 'tarefa X',  done: true
    })
})
