// Inject modules
const express = require('express');
const config = require('./config/config')
const jwt = require('jsonwebtoken');
const app = express();

app.use((req, res, next) => {
    console.log("validate token")
    if((req.headers['clientsid'] || '') && (req.headers['token'] || '')){
        jwt.verify(req.headers['token'], config.jwtToken,function(err,resp){
            if(err){
                res.json({
                    status:false,
                    message:"token_is_expired"
                }) 
            }else if(resp){
               return next();
            }
        });
    }else{
        res.json({
            status:false,
            message:"required_data_not_available_to_validate_request"
        })  
    }
});

/**
 * ---------------------------------------------------------------
 * Inject all routes like below
 * ---------------------------------------------------------------
 */
const sessionmodule = require('./api/dashboard/dashboard');
/* -----------------------------------------------------------  */


app.use('/v1.0',sessionmodule);




// Export
module.exports = app;