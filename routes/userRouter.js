const express = require('express'),
    bcrypt = require('bcrypt');



// Router
let userRouter = express.Router();

// userRouter.get('/user',async (req,res)=>{
//     let salt = await bcrypt.genSalt(10);
//     let hash = await bcrypt.hash('1234', salt);
//     console.log(hash)
//     res.render('userComponent/user');
// });

userRouter.get('/user', (req,res)=>{
    res.render('userComponent/user');
});
module.exports= userRouter;