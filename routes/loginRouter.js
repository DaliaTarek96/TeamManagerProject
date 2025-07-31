const express = require('express'),
      path = require('path'),
      mongoose = require('mongoose'),
      Cryptr = require ('cryptr'),
    cryptr= new Cryptr('myTotalySecretKey');

// use router
const loginRouter = express.Router();

// connect to user schema 
require(path.join(__dirname,'..','model','userModel.js'));
let userSchema = mongoose.model('users');

// Router
loginRouter.get('/login',(req,res)=>{
    res.render('loginComponent/login',{NotFound:false,incorrect:false});
});

loginRouter.post('/login',(req,res)=>{
    userSchema.find({Email:req.body.email}).then((data)=>{
        if(data.length != 0){
            let password = cryptr.decrypt(data[0].Password);
            if (req.body.email.toLowerCase() === data[0].Email && password=== req.body.password && data[0].role ==='admin'){
                // to admin page    
                res.redirect('/admin');
            }else if (req.body.email.toLowerCase() === data[0].Email && password=== req.body.password && data[0].role ==='teamMember'){
                res.redirect('/user');
            }
            else{
            res.render('loginComponent/login', {NotFound:false,incorrect:true });
            }
        }else{
            res.render('loginComponent/login', {NotFound:true,incorrect:false });
        }
    }).catch(()=>{
        res.status(404).redirect("/error");
    });
});


module.exports = loginRouter;
