const config = require('config'),
      express = require('express'),
      path = require('path'),
      body_parser = require('body-parser'),
      mongoose = require('mongoose'),
      cookieParser = require('cookie-parser'),
      regRouter = require('./routes/registerRouter'),
      loginRouter = require('./routes/loginRouter'),
      adminRouter = require('./routes/adminRouter'),
      errorRouter = require('./routes/errorRouter'),
      userRouter = require('./routes/userRouter');



// server
const server = express();
if(!config.get('jwtPrivateKey')){
    console.log('FATAL ERROR !!!!!!');
    process.exit(1);
}

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
server.use(cookieParser());
// middleware
server.use((req, res, next)=>{
    console.log(req.url);
    next();
}); 
// Routers
server.get('/',(req,res, next)=>{
    res.render('home');
});
server.get('/logout',(req,res)=>{
    res.clearCookie('token', {httpOnly:true});
    res.redirect('/');
});
server.use(regRouter);
server.use(loginRouter);
server.use(errorRouter);
server.use(adminRouter);
server.use(userRouter);

server.use((req,res)=>{
    res.status(404).redirect("/error");
})

// port
let port = process.env.port;
server.listen(port|| 8080 ,()=>{
    console.log('I am listening ...');
});  