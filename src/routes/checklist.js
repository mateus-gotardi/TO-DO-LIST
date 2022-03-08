const express = require('express')
const router = express.Router()

const Checklist = require ('../models/checklist')
const Task = require ('../models/task')

router.get('/', async (req,res)=>{ //mostra todas as checklists criadas
    try {
        let checklists = await Checklist.find({})
        res.status(200).render('checklist/index', {checklists: checklists})
    } catch (error){
        res.status(500).render('pages/error', {error: 'Erro ao carregar listas'})
    }
})

router.get('/new', async(req,res)=>{
    try{
        let checklist = new Checklist()
        res.status(200).render('checklist/new', {checklist:checklist})
    } catch (error) {
        res.status(500).render('pages/error', {error: 'Erro ao criar lista'})
    }
})

router.get('/:id/edit', async (req, res)=>{
    try {
        let checklist = await Checklist.findById(req.params.id)
        res.status(200).render('checklist/edit', {checklist:checklist})
    } catch (error) {
        res.status(500).render('pages/error', {error: 'Erro ao editar lista'})
    }
})

router.post('/', async (req, res)=>{//cria nova checklist
    let {name}=req.body.checklist
    let checklist = new Checklist({name})

    try{
        await checklist.save()
        res.redirect('/checklists')
    } catch (error){
        res.status(422).render('checklist/new',{checklist: {...checklist, error}})
    }
})

router.get('/:id', async (req,res)=>{//encontra uma checklist por ID
try{
    let checklist = await Checklist.findById(req.params.id).populate('tasks')
    res.status(200).render('checklist/show', {checklist: checklist})
}catch (error){
    res.status(500).render('pages/error', {error: error.message})
}
})

router.put('/:id',async (req,res)=>{
    let {name}=req.body.checklist
    let checklist = await Checklist.findById(req.params.id)
    try {
        await checklist.update({ name })
        res.redirect('/checklists')
    }catch(error){
        let errors = error.errors
        res.status(422).render('checklist/edit', {checklist: {...checklist, errors}})
    }
})

router.delete('/:id', async (req,res)=>{
    try {
        await Checklist.findByIdAndRemove(req.params.id)
        res.redirect('/checklists')
    }catch(error){
        res.status(500).render('pages/error', {error: 'Erro ao deletar'})
    }
})


module.exports=router