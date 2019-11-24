const nodemailer = require('nodemailer');
const config = require('../config/config');

const sendMail = (from, to, subject, message) => {
    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport(config.mail);

        const mailOptions = {
            from: from,
            to: to,
            subject: subject,
            text: message
        };
        console.log("mailoptn", mailOptions)

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log("err smtp", err);
                reject(err)
            } else {
                console.log("email sent no issue", info);
                resolve("info")
            }

        });
    })


};

module.exports = sendMail;