const nodemailer = require('nodemailer');
const config = require('../config/email');


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.email, // generated ethereal user
        pass: config.pass, // generated ethereal password
    },
});

const email = async (html) => {
    await transporter.sendMail({
        from: '"Interma LLC"<' + config.email + '>', // sender address
        to: config.email, // list of receivers
        subject: "Mail from Website", // Subject line
        html: html, // html body
    });
}

module.exports = email;