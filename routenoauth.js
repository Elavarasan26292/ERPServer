// Inject modules
const express = require('express');
const app = express();
/**
 * ---------------------------------------------------------------
 * Inject all routes like below
 * ---------------------------------------------------------------
 */
const remindemodule = require('./api/loginRegister');
/* -----------------------------------------------------------  */

// setup all route paths like below


app.use('/loginregister',remindemodule);


// Export
module.exports = app;