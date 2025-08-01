const express= require('express'),
    mongoose = require ('mongoose'),
    path = require('path'),
    auth = require('./../middlewares/auth'),
    admin = require('./../middlewares/admin');

// set DB
require('./../model/userModel');
require('./../model/taskModel');
let userSchema = mongoose.model('users');
let taskSchema = mongoose.model('task');
// set router
let adminRouter = express.Router();

adminRouter.get('/admin',[auth,admin],async (req,res)=>{
    const data = await userSchema.find({role:'teamMember'});
    const tasks = await taskSchema.find({}).populate({path:'Members'});
    if(!data || !tasks){
       res.status(404).redirect("/error");
    }else{
        res.render('adminComponent/admin',{data:data, tasks:tasks});
    }
   
});

adminRouter.post('/admin/role',(req,res)=>{
    userSchema.updateOne({Email :req.body.Email },{$set:{
        role:'admin'
    }}).then((data)=>{
        res.redirect('/admin');
    }).catch(()=>{
        res.status(404).redirect("/error");
    });
});

// to show all tasks
adminRouter.get('/tasks/:id',[auth,admin],(req,res)=>{
    taskSchema.find({_id:req.params.id}).populate({path:'Members'}).then((data)=>{
        res.render('adminComponent/showTasks',{data:data[0]});
    }).catch(()=>{
        res.status(404).redirect("/error");
    });
});


// to make new project
adminRouter.get('/new-project',[auth,admin],(req,res)=>{
    userSchema.find({role:'teamMember'})
    .then((data)=>{
        res.render('adminComponent/addProject',{data:data});
    })
    .catch(()=>{
       res.status(404).redirect("/error");
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
        res.status(404).redirect("/error");
    });
    
});
module.exports =adminRouter;
