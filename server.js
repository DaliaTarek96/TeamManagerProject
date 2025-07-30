const express = require('express'),
      path = require('path'),
      body_parser = require('body-parser'),
      mongoose = require('mongoose'),
      regRouter = require('./routes/registerRouter'),
      loginRouter = require('./routes/loginRouter'),
      adminRouter = require('./routes/adminRouter'),
      errorRouter = require('./routes/errorRouter');


// server
const server = express();

// mongo db
mongoose.connect("mongodb://localhost:27017/taskmanager")
.then(()=>{console.log('db connected...')})
.catch((err)=>console.log(err));
// setting
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname,'views'));
server.use(express.static(path.join(__dirname,'public')));
server.use(body_parser.urlencoded({extended:false}));
server.use(body_parser.json());
// middleware
server.use((req, res, next)=>{
    console.log(req.url);
    next();
}); 
// Routers
server.get('/',(req,res, next)=>{
    res.render('home');
});
server.use(regRouter);
server.use(loginRouter);
server.use(adminRouter);
server.use(errorRouter);
server.use((req,res)=>{
    res.status(404).redirect("/error");
})
// port
let port = process.env.port;
server.listen(port|| 8080 ,()=>{
    console.log('I am listening ...');
});  