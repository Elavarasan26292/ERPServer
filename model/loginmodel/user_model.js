const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({ 
    firstName:{
        type:String,
        require:true
    },
    emailId:{
        type:String,
        require:true
    },
    phoneNo:{
        type:Number,
        required:true
    },
    address1:{
        type:String,
        required:true
    },
    address2:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    zipCode:{
        type:String,
        required:true
    },  
});
module.exports = userSchema;