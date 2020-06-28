const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    task : {
        type : String,
        required : true
    },
    completion_date : {
        type: Date,
        
    },
    task_status:{
        type : Boolean
        // default : false
    },
        date:{
            type : Date,
            default : Date.now
        }

    
},{
    timestamps : true
})

const todos = mongoose.model('todo',todoSchema)
module.exports = todos