const express = require('express')
const {fetchJSON} = require('../models/fetchJSON')
const {fetchFact} = require('../models/fetchFact')

const router = express.Router()

router.get('/ping',(req,res)=>{
    res.json({message:'pong'})
})

router.get('/about_me',(req,res)=>{
    const section = req.query.section;
    let data;

    if(section){
        data = fetchJSON('about_me',section)
    }
    else{
        data = fetchJSON('about_me')
    }

    res.json(data)
})

router.get('/fact',(req,res)=>{
    data = fetchFact()
    

    res.json(data)
})

module.exports = router