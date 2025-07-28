const express= require('express'),
    mongoose = require ('mongoose'),
    path = require('path');

// set DB
require('./../model/userModel');
let userSchema = mongoose.model('users');
// set router
let adminRouter = express.Router();

adminRouter.get('/admin',(req,res)=>{
    userSchema.find({role:'teamMember'})
    .then((data)=>{
         res.render('adminComponent/admin',{data:data});
    }).catch(()=>{
        ///////will add 404 page ///////
        res.send("Sorry, page in maintanance...");
    })
   
});

adminRouter.post('/admin/role',(req,res)=>{
    userSchema.updateOne({Email :req.body.Email },{$set:{
        role:'admin'
    }}).then((data)=>{
        console.log(data)
        res.redirect('/admin');
    }).catch(()=>{
        ///////will add 404 page ///////
        res.send("Sorry, page in maintanance...");
    });
});
// to make new project
adminRouter.get('/admin/new',(req,res)=>{
    res.render('adminComponent/addProject');
});
module.exports =adminRouter;



