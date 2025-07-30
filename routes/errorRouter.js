const express= require('express');

let errorRouter= express.Router();

errorRouter.get('/error',(req,res)=>{
    res.render("errorComponent/error");
});

module.exports = errorRouter;