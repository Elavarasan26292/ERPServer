var config = require('./config/config');
var mongoose = require('mongoose');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
//Object holding all your connection strings
var newConnect = {};

var getDatabaseConnection = function (dbName) {
    if (newConnect[dbName]) {
        //database connection already exist. Return connection object	
        return newConnect[dbName];
    } else {
        // newConnect[ dbName ] = "dd";
        if (config.dbuser) {
            newConnect[dbName] = mongoose.createConnection("mongodb://" + config.dbuser.user + ":" + config.dbuser.pass + "@" + config.clientdb + dbName + "?authSource=admin");
        } else {
            newConnect[dbName] = mongoose.createConnection(config.clientdb + dbName);
        }

        return newConnect[dbName];
    }
}
module.exports = getDatabaseConnection;