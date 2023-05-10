const mongoose = require("mongoose");

const schema = mongoose.Schema;

const customerSchema = new schema({
    RegNo:{
        type:String,
        required:[true, 'Registration number is required']
    },
    Name:{
        type:String,
        required:[true, 'Name is required']
    },
    Email:{
        type:String,
        required:[true, 'Email is required'],
        validate: {
            validator: function(v) {
              return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    Address:{
        type:String,
        required:[true, 'Address is required']
    },
    Phone:{
        type:String,
        required:[true, 'Phone number is required'],
        validate: {
            validator: function(v) {
              return /^[0-9]{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }
});

const customer = mongoose.model("customers",customerSchema);

module.exports = customer;