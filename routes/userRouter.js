const express = require("express"),
  bcrypt = require("bcrypt"),
  mongoose = require("mongoose"),
  { body, validationResult } = require("express-validator"),
  auth = require("./../middlewares/auth"),
  user = require("./../middlewares/user"),
  Cryptr = require("cryptr");
cryptr = new Cryptr("myTotalySecretKey");

// Router
let userRouter = express.Router();

// Mongoose schema
require("./../model/userModel");
require("./../model/taskModel");
let userSchema = mongoose.model("users");
let taskSchema = mongoose.model('task');
// userRouter.get('/user',async (req,res)=>{
//     let salt = await bcrypt.genSalt(10);
//     let hash = await bcrypt.hash('1234', salt);
//     console.log(hash)
//     res.render('userComponent/user');
// });

userRouter.get("/:name", [auth, user], async (req, res) => {
    const user = await userSchema.findOne({ _id: req.user._id });

    const tasks = await taskSchema.find({Members: {$elemMatch:{ MemberName:req.user._id} }}).populate('Members.MemberName') ;
   
    if (!user || !tasks){
        res.status(404).redirect("/error");
     }else{
      res.render("userComponent/user", {
        user: user,
        tasks:tasks,
        errors: [],
        equals: true,
        old: false,
        flag:false
      });
     }
});
userRouter.post('/finish', async (req,res)=>{
    let user = await userSchema .find({_id :req.body.uID});
    const tasks = await taskSchema.findOne({_id:  req.body.tID }).populate('Members Tasks') ;
    try {
      tasks.Members.forEach(t=>{
          if (t.MemberName == user[0]._id.toString()) 
            t.status='done';
      });
      tasks.FinishTime =new Date().toISOString();
      await tasks.save();
    }catch(ee) {
            res.status(404).redirect("/error");
    };
    res.redirect("/"+user[0].Name+"");
})
userRouter.post('/chooseTask', async (req,res)=>{
  
    let user = await userSchema .find({_id :req.body.uID});
    const tasks = await taskSchema.findOne({_id:  req.body.tID }).populate('Members Tasks') ;

  if (req.body.chooseTa){
    try {
        tasks.Tasks =tasks.Tasks.map(t=>{
        if (req.body.chooseTa.includes(t.TaskName) && t.status ==false)
         {
          t.Developer = user[0].Name;
          t.status = true;
         }
         else{
          t.Developer = t.Developer;
          t.status = t.status;
         }
         return t;
      });
      tasks.Members.forEach(t=>{
          if (t.MemberName == user[0]._id.toString()) 
            t.status='todo';
      })
      await tasks.save();
    }catch(ee) {
            res.status(404).redirect("/error");
    };
    res.redirect("/"+user[0].Name+"");
  }else{
    res.redirect("/"+user[0].Name+"");
  }
}); 

userRouter.post(  
  "/:name",
  [
    body("oldpassword").notEmpty().withMessage("This Field is Required!"),
    body("newpassword").notEmpty().withMessage("This Field is Required!"),
    body("confirm_password").notEmpty().withMessage("This Field is Required!"),
  ],
  async (req, res) => {
 
    
        let errors = validationResult(req);
    let equals = equal(req.body.newpassword, req.body.confirm_password);
    let old = false;
    const u = await userSchema.findOne({ Email: req.body.email });
    const tasks = await taskSchema.find({Members: {$elemMatch:{ MemberName:u._id.toString()} } }).populate('Members.MemberName') ;
    if (!u || !tasks){
        res.status(404).redirect("/error");
    }else{
      
      let pass = cryptr.decrypt(u.Password);

      if (pass !== req.body.oldpassword) old = true;
      if (errors.array().length === 0 && old === false && equals == true) {
        let Npass = cryptr.encrypt(req.body.newpassword);
        userSchema
          .updateOne(
            { Email: u.Email },
            {
              $set: {
                Password: Npass,
              },
            }
          )
          .then(() => {
            res.redirect("/logout");
          })
          .catch(() => {
            res.status(404).redirect("/error");
          });
      } else {
        res.render("userComponent/user", {
          user: u,
          tasks:tasks,
          errors: errors.array(),
          equals: equals,
          old: old,
          flag:false  });
      }
      
        }
      }
);




module.exports = userRouter;
function equal(name, cname) {
  if (name == cname) return true;
  else return false;
}
