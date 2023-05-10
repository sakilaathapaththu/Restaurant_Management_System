const mongoose = require('mongoose');
//schema- document ekak data base ekata add wenne schema eka
const Schema = mongoose.Schema;

const inventorySchema = new Schema({

    type :{
        type:String,
        require : true
    },
    name :{
        type:String,
        require : true //backend validation name eka dala thibbe neththan weda karanne ne
    },
    date :{
        type:String,
        require:true
    },
    quantity :{
        type: Number,
        require:true
    },
    unitprice :{
        type: Number,
        require:true
    },
    totalprice :{
        type: Number,
        require:true
    }
})

//database ekata data yawanna

const Inventory = mongoose.model("Inventory",inventorySchema);

module.exports = Inventory;
