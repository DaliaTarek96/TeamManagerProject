
module.exports = function(req,res,next){
    if ( ! (req.user.role === 'teamMember')) 
        {
            res.status(403).send('!Access Denied .....');}
    next();
}