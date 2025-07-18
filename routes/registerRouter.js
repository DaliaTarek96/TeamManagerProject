const express = require('express'),
      {body, validationResult} = require('express-validator');

// Router
const regRouter = express.Router();

regRouter.get('/register',(req,res)=>{
     res.render('registerComponent/register', {errors:[],confirm:false} );
});
regRouter.post('/register',[
    body('name').notEmpty().withMessage('Name is Required!'),
    body('email').isEmail().withMessage('Email must be valid!'),
    body('password').notEmpty().withMessage('Password is Required!')
    .isLength({min :8}).withMessage('Password must be at least 6 character')
    .matches(/[A-Z]/).withMessage('Password must conatain at least 1 uppercase')
    .matches(/[^a-zA-Z0-9]/).withMessage('Password must conatain at least 1 special character'),
], (req,res)=>{
    let errors = validationResult(req);
    let equals = equal(req.body.password, req.body.confirm_password)
    if (! errors.isEmpty() || !equals ){
        res.render('registerComponent/register',{errors: errors.array(), confirm:equals});
    }
    else{
        res.render('home');
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

module.exports = regRouter;


