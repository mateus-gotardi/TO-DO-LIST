const express = require('express')
const checkListRouter= require('./src/routes/checklist')
const taskRouter= require('./src/routes/task')
const rootRouter = require ('./src/routes/index')
const methodOverride = require ('method-override')
const path = require('path')
const app = express()
require('./config/database')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method', {methods:['POST', 'GET']}))

app.set('views',path.join(__dirname, 'src/views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', rootRouter)
app.use('/checklists',checkListRouter)
app.use('/checklists',taskRouter.checklistDependent)
app.use('/tasks',taskRouter.simple)

app.listen(3000,()=>{
    console.log("servidor iniciado")
})
