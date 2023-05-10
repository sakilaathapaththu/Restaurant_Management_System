const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({

    itemCode:{
        type: String,
        required: true

    },

    cusId:{
        type: String,
        required: true

    },

    cusName:{
        type: String,
        required: true

    },

    filepath:{
        type:String
        
    },

    itemType:{
        type: String,
        required: true
    },

    noOfItems:{
        type:Number,
        required: true
    },

    greeting:{
        type: String,
        required: true
    },

    orderDate:{
        type: String,
    },

    dueDate:{
        type: String,
    }
})

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;