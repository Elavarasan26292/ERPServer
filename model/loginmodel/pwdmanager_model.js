const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const loginSchema = new Schema({ 
    userid:{
        type:String,
        require:true
    },
    pwd_tx:{
        type:String,
        require:true
    },
    session_id:{
        type:String,
        require:true
    },
    last_access:{
        type:Date,
        require:true
    }
});
module.exports = loginSchema;