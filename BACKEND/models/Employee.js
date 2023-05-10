const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({

    ID:{
        type: String,
        required: true

    },

    name:{
        type: String,
        required: true
    },

    filepath:{
        type:String
        
    },

     contact:{
        type:Number,
        required: true
    },

     designation:{
        type:String,
        required: true
    },


     join:{
        type:String
    }
})

const Employee = mongoose.model("Employee",employeeSchema);

module.exports = Employee;