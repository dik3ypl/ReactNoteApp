const nodemailer = require('nodemailer')
const config = require('../globalConfig.json')

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    secure: true,
    auth: {
        user: 'spacenotes@zohomail.eu',
        pass: 'kbFXRQg25yHv'
    }
})

module.exports = class Mail {
    constructor() { }

    verificationEmail(email, code) {
        transporter.sendMail({
            from: 'spacenotes@zohomail.eu',
            to: email,
            subject: 'Account verification',
            html: `<a href="${config.domain}/verify?c=${code}">[LINK]</a>`
        })
    }

    changePassword(email) {

    }
}