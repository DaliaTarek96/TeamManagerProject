const express = require('express');


// server
const server = express();


// middleware
server.use((req, res)=>{
    console.log(req.url);
    res.send('welcome back ...');
}); 

// port
let port = process.env.port;
server.listen(port|| 8080 ,()=>{
    console.log('I am listening ...');
});