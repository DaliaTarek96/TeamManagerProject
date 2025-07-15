const express = require('express'),
      path = require('path');


// server
const server = express();

// setting
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname,'views'));
server.use(express.static(path.join(__dirname,'public')));

// middleware
server.use((req, res, next)=>{
    console.log(req.url);
    next();
}); 
server.use((req,res, next)=>{
    res.render('home');
});
// port
let port = process.env.port;
server.listen(port|| 8080 ,()=>{
    console.log('I am listening ...');
});  