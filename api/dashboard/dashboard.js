// Inject Modules
const express = require('express');
const dashbrdCtrl = require('../../controllers/dashboard/dashboardCtrl');
const router = express.Router();

router.post('/dashboardapi',[dashbrdCtrl.simpleSessionTest]);


module.exports = router;