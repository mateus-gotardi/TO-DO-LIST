const express = require('express')

const app = express()

app.listen(3000,()=>{
    console.log("servidor iniciado")
})

app.get ('/', (req, res)=>{
    res.end('<h1>Minha lista de tarefas</h1>')
})
app.get('/json', (req,res)=>{
    res.json({
        title: 'tarefa X',  done: true
    })
})
