let mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    config = require('config');
let users = new mongoose.Schema({
    Name :{type:String, required:true},
    Email: {type:String, required:true,lowercase:true},
    Password: {type:String, required:true , min: 8},
    role:{type:String,default:'teamMember'}
});

users.methods.generateAuthToken = function(){
    return jwt.sign({_id:this._id, role :this.role}, config.get('jwtPrivateKey'),{expiresIn:20*60});
    // 20*60 => 20 minute

}
mongoose.model('users', users);