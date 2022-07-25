const nodemailer = require('nodemailer')
const config = require('../globalConfig.json')

const transporter = nodemailer.createTransport({
    host: config.host,
    secure: true,
    auth: {
        user: config.mail,
        pass: config.password
    }
})

module.exports = class Mail {
    constructor() { }

    verificationEmail(email, code) {
        transporter.sendMail({
            from: config.mail,
            to: email,
            subject: 'Account verification',
            html: `<a href="${config.domain}/verify?c=${code}">[LINK]</a>`
        })
    }

    resetPassword(email, code) {
        transporter.sendMail({
            from: config.mail,
            to: email,
            subject: 'Reset password',
            html: `<a href="${config.domain}/resetPassword?c=${code}">[LINK]</a>`
        })
    }
}