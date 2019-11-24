const mongoose = require('mongoose');
const config = require('../config/config');

//Object holding all your connection strings
var connections = {};

module.exports = (clientId) => {
    // const lmsDb = "REMINDER_DB";
    const lmsDb = clientId;
    if (connections[lmsDb]) {   //Returning the Old connection
        //database connection already exist. Return connection object
        return connections[lmsDb];
    } else if(config.dbuser){       //Creating new connection with Mongodb authentication
        connections[lmsDb] = mongoose.createConnection("mongodb://" + config.dbuser.user + ":" + config.dbuser.pass + "@" + config.connectdbUrl + lmsDb + "?authSource=admin");
        return connections[lmsDb];
    }else{      //Creating new connection without authentication
        connections[lmsDb] = mongoose.createConnection(config.clientdb  + lmsDb);
        return connections[lmsDb];
    }
};
