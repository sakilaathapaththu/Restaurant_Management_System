const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DistributionSchema = new Schema({

    Date:{
        type:String,
        required: true

    },

    Dambulla:{
        type:Number,
        required: true

    },

    Matale:{
        type:Number,
        required: true

    },

    Kandy:{
        type:Number,
        required: true

    },
    total:{
        type:String,
        required: true

    },

    vehicleId:{
        type:String,
        required: true

    },

    drivername:{
        type:String,
        required: true
    }

    
})

const Distribution = mongoose.model("Distribution", DistributionSchema);

module.exports = Distribution;