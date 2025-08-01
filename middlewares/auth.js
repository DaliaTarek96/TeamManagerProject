const jwt = require('jsonwebtoken'),
    config = require('config');

    module.exports = function(req,res, next){
        const token = req.cookies.token;
        if(!token){
           return res.status(401).send('Access denied. No token provided.');
        } 
        else{
            try{
                const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
                req.user= decoded;
                next();
            }catch(ex){
                res.status(400).redirect('/error');
            }
        }  
    }
