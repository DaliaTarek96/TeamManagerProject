let mongoose = require('mongoose');
let users = new mongoose.Schema({
    Name :{type:String, required:true},
    Email: {type:String, required:true,lowercase:true},
    Password: {type:String, required:true , min: 8},
    role:{type:String,default:'teamMember'}
});

mongoose.model('users', users);