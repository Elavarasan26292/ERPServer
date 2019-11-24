// Inject Modules
const express = require('express');
const validateUserdata = require('../validations/user-validate');
const validateLogindata = require('../validations/pwd-validate');
const loginregisterCtrl = require('../controllers/logincontroller/loginregisterCtrl');
const router = express.Router();

router.post('/newuser',[validateUserdata],
[loginregisterCtrl.newuserRegisterdata],
[loginregisterCtrl.generatePassword],
[loginregisterCtrl.welcomeMail]
);

router.post('/userlogin',[validateLogindata],
[loginregisterCtrl.decryptData],
[loginregisterCtrl.checkuserAvailability],
[loginregisterCtrl.SessionCreation]
)

module.exports = router;