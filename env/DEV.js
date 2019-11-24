module.exports = {
    serverPort: 8012,
    clientdb: 'mongodb://127.0.0.1:27017/',
    dbname:"ERP",
    cryptoToken:"ERPCRYPTOTOKENFORLOGIN",
    jwtToken:"ERPWEBTOKEN_TOVALIDATEREQUEST",
    sessionexpiry: "15m",
    mail: {
         //Add the email configrations here
         service: 'gmail',
         secure: false, 
            auth: {
    user: 'erpmarketting@gmail.com',
    pass: 'erp@1234'
  }
}
};