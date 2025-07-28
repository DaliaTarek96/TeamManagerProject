const express= require('express'),
    mongoose = require ('mongoose'),
    path = require('path');

// set DB
require('./../model/userModel');
require('./../model/taskModel');
let userSchema = mongoose.model('users');
let taskSchema = mongoose.model('task');
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
adminRouter.get('/new-project',(req,res)=>{
    userSchema.find({role:'teamMember'})
    .then((data)=>{
        res.render('adminComponent/addProject',{data:data});
    })
    .catch(()=>{
        ///////will add 404 page ///////
        res.send("Sorry, page in maintanance...");
    });
    
});
adminRouter.post('/new-project',(req,res)=>{
    let newTask = new taskSchema({
        Title: req.body.title,
        Track: req.body.track,
        StartDate: req.body.Start,
        EndDate: req.body.end,
        Members :req.body.Members,
        Tasks: req.body.Tasks
    });
    newTask.save()
    .then(()=>{
        res.redirect('/admin');
    }).catch(()=>{
        ///////will add 404 page ///////
        res.send("Sorry, page in maintanance...");
    });
    
});
module.exports =adminRouter;



