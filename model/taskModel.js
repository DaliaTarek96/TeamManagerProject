const mongoose = require('mongoose');

let taskSchema = new mongoose.Schema({
    Title :{type: String , required:true},
    Track :{type: String , required:true},
    StartDate :{type: Date , required:true},
    EndDate:{type: Date , required:true},
    Members:[{type: String , required:true, ref:'users'}],
    Tasks :[{type: String , required:true}]
});

mongoose.model('task',taskSchema);