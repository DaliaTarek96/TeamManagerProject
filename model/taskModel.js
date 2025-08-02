const mongoose = require('mongoose');

let taskSchema = new mongoose.Schema({
    Title :{type: String , required:true},
    Track :{type: String , required:true},
    StartDate :{type: Date , required:true},
    EndDate:{type: Date , required:true},
    FinishTime :{type: Date },
    Members:[{
        MemberName:{type: String , required:true, ref:'users'},
        status:{type: String , default:"new"} // new , todo, done
    }],
    Tasks :[{
        TaskName: {type: String , required:true, default:''},
        Developer: {type: String ,   default:'', ref:'users'} ,
        status: {type: Boolean ,  default:false}      
    }]
});

mongoose.model('task',taskSchema);