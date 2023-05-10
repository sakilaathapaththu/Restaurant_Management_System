const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create schema
const daily_detailSchema = new Schema({

    ID:{
        type: String
        

        

    },
    
    startTime:{
        type: String
        

    },

    endTime:{
        type: String
        

    },
    
    otSalary:{
        type: String
        

    },

    salary:{
        type: String
        
    },
    
    

    
})

const DailyDetail = mongoose.model("DailyDetail",daily_detailSchema);

module.exports = DailyDetail;