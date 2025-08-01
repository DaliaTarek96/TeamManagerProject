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
let userSchema = mongoose.model("users");
// userRouter.get('/user',async (req,res)=>{
//     let salt = await bcrypt.genSalt(10);
//     let hash = await bcrypt.hash('1234', salt);
//     console.log(hash)
//     res.render('userComponent/user');
// });

userRouter.get("/:name", [auth, user], (req, res) => {
  userSchema
    .findOne({ _id: req.user._id })
    .then((user) => {
      res.render("userComponent/user", {
        user: user,
        errors: [],
        equals: true,
        old: false,
      });
    })
    .catch(() => {
      res.status(404).redirect("/error");
    });
});
userRouter.post(
  "/:name",
  [
    body("oldpassword").notEmpty().withMessage("This Field is Required!"),
    body("newpassword").notEmpty().withMessage("This Field is Required!"),
    body("confirm_password").notEmpty().withMessage("This Field is Required!"),
  ],
  (req, res) => {
    let errors = validationResult(req);
    let equals = equal(req.body.newpassword, req.body.confirm_password);
    let old = false;
    userSchema
      .findOne({ Email: req.body.email })
      .then((u) => {
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
            errors: errors.array(),
            equals: equals,
            old: old,
          });
        }
      })
      .catch(() => {
        res.status(404).redirect("/error");
      });
  }
);

module.exports = userRouter;
function equal(name, cname) {
  if (name == cname) return true;
  else return false;
}
