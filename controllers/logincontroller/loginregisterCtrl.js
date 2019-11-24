const config = require('../../config/config');
const pwdSchema = require("../../model/loginmodel/pwdmanager_model");
const userSchema = require("../../model/loginmodel/user_model");
const selectDb = require('../../common/select-db');
const mailer = require('../../common/mail');
var mongoose = require('mongoose');
var passwordHash = require('password-hash');
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;
module.exports = {
    newuserRegisterdata:((req,res,next) =>{
        const db = selectDb(config.dbname);
        const user_instance = db.model('user_data', userSchema, "user_data");
        let registerUser = new user_instance(req.body);
        registerUser.save(function(err,userData){
            if(err){
                res.json({
                    status:false,
                    message:err
                })
            }else{
                return next();
            }
        })
    }),
    generatePassword:((req,res,next) =>{
        const db = selectDb(config.dbname);
        const login_instance = db.model('login_session_data', pwdSchema, "login_session_data");
        var hashedPassword = passwordHash.generate(req.body.password);
        let loginUser = new login_instance(req.body);
        loginUser.userid=req.body.emailId;
        loginUser.pwd_tx=hashedPassword;
        loginUser.session_id="empty";
        loginUser.last_access=new Date();
        loginUser.save(function(err,pwdresp){
            if(err){
                res.json({
                    status:false,
                    message:err
                })
            }else{
                return next();
            }
        })
    }),
    welcomeMail:((req,res,next) =>{
        if(req.body.mail=="Y"){
            mailer("Erp-Mailer",req.body.emailId,"Welcome to Erp Application","<html>Dummymailcontent</html>").then(function(result){
                console.log("This is the result");
                res.json({
                    status:true,
                    message:"data saved successfully and mail triggered"
                })
            })
        }else{
            res.json({
                status:true,
                message:"data saved successfully"
            })
        }
    }),
    decryptData:((req,res,next) =>{
        let user=CryptoJS.AES.decrypt(req.body.emailId, config.cryptoToken, {
            iv: config.cryptoToken
        }).toString(CryptoJS.enc.Utf8);

        let pwd=CryptoJS.AES.decrypt(req.body.password, config.cryptoToken, {
            iv: config.cryptoToken
        }).toString(CryptoJS.enc.Utf8);
        if(user.length>0 && pwd.length>0){
            req.user=user;
            req.pwd=pwd;
            return next();
        }else{
            res.json({
                status:false,
                message:"invalid_login_credentials"
            })
        }
    }),
    checkuserAvailability:((req,res,next) =>{
        const db = selectDb(config.dbname);
        const user_instance = db.model('user_data', userSchema, "user_data");
        const login_instance = db.model('login_session_data', userSchema, "login_session_data");
        user_instance.findOne({
            emailId:req.user
        },function(err,userresp){
            if(err){
                res.json({
                    status:false,
                    message:err
                })
            }else if(userresp){
                login_instance.findOne({
                    userid:req.user
                },function(err,userresp){
                    if(err){
                        res.json({
                            status:false,
                            message:err
                        })
                    }else if(userresp){
                        userresp=JSON.parse(JSON.stringify(userresp));
                        if(passwordHash.verify(req.pwd, userresp.pwd_tx) == true){
                            return next();
                        }else{
                            res.json({
                                status:false,
                                message:"invalid_password"
                            })
                        }   
                    }else{
                        res.json({
                            status:false,
                            message:"logininformation_not_available"
                        })
                    }
                })
            }else{
                res.json({
                    status:false,
                    message:"userMaster_data_not_available"
                })
            }
        })
    }),
    SessionCreation:((req,res,next) =>{
        var token = jwt.sign({ 
            emailheader: req.body.emailId
                    }, config.jwtToken,
                 { expiresIn: config.sessionexpiry });
        res.json({
            status:true,
            clientsid:req.body.emailId,
            token:token,
            message:"login_success"
        })
    })
}

