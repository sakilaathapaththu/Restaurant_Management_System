const mongoose = require("mongoose");

const schema = mongoose.Schema;

const financeSchema = new schema({
    InvoiceID:{
        type:String,
        required:true
    },
    BillName:{
        type:String,
        required:true
    },
    AccountNo:{
        type:Number,
        required:true
    },
    Amount:{
        type:Number,
        required:true
    },
    PaymentDate:{
        type:String,
        required:true
    }
})

const finances = mongoose.model("finances",financeSchema);

module.exports = finances;