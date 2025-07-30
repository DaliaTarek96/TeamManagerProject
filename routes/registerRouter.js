const express = require('express'),
      {body, validationResult} = require('express-validator'),
      mongoose= require('mongoose'),
      path = require('path'),
      Cryptr = require('cryptr')
      cryptr= new Cryptr('myTotalySecretKey');


// connect to db user schema
require(path.join(__dirname,'..','model','userModel.js'));
let users = mongoose.model('users');
// Router
const regRouter = express.Router();

regRouter.get('/register',(req,res)=>{
     res.render('registerComponent/register', {errors:[],confirm:true, userFound:false} );
});
regRouter.post('/register',[
    body('name').notEmpty().withMessage('Name is Required!'),
    body('email').isEmail().withMessage('Email must be valid!'),
    body('password').notEmpty().withMessage('Password is Required!')
    .isLength({min :8}).withMessage('Password must be at least 8 character')
    .matches(/[A-Z]/).withMessage('Password must conatain at least 1 uppercase')
    .matches(/[^a-zA-Z0-9]/).withMessage('Password must conatain at least 1 special character'),
], (req,res)=>{
    let errors = validationResult(req);
    let equals = equal(req.body.password, req.body.confirm_password)
    if (! errors.isEmpty() || !equals ){
        res.render('registerComponent/register',{errors: errors.array(), confirm:equals, userFound:false});
    }
    else{
        // save new user on DB ...
        saveUser(req.body, res);
    }
});

// functions
// to check if password field = confirm password
function equal(name , cname){
    if (name == cname)
        return true;
    else
        return false;
}

// To save a new user  in DB
function saveUser(data, res){
    // check if email is found or not in db
    let userFound = false;
    users.find({Email:data.email}).then((da)=>{
        if(!(da.length==0)){
            userFound= true;
            res.render('registerComponent/register',{errors:[],confirm:true,userFound: true});
        }else{
            const encryptedPasswordString = cryptr.encrypt(data.password);
            // sign up new user 
            let user = new users({
                Name: data.name,
                Email: data.email,
                Password: encryptedPasswordString,
                ConfirmPassword: data.confirm_password
            });
            user.save().then(()=>{
                ///////will add user page ///////
                res.redirect('/')
            }).catch(()=>{
                res.status(404).redirect("/error");
            });
        }
    });
}
module.exports = regRouter;


