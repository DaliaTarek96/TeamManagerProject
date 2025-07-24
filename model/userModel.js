let mongoose = require('mongoose');
let users = new mongoose.Schema({
    Name :{type:String, required:true},
    Email: {type:String, required:true},
    Password: {type:String, required:true , min: 8},
    ConfirmPassword:{type:String, required:true}
});

mongoose.model('users', users);