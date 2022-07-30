const nodemailer = require('nodemailer')
const config = require('../globalConfig.json')

const mail = `"Space Notes" <${config.mail}>`

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    auth: {
        user: config.mail,
        pass: config.password
    }
})

module.exports = class Mail {
    constructor() { }

    verificationEmail(email, code) {
        transporter.sendMail({
            from: mail,
            to: email,
            subject: 'Account verification',
            html: Email('Verify account', 'Verify', 'verify', code)
        })
    }

    resetPassword(email, code) {
        transporter.sendMail({
            from: mail,
            to: email,
            subject: 'Reset password',
            html: Email('Reset password', 'Reset', 'resetPassword', code)
        })
    }
}

function Email(main, btnText, path, code) {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <style>
                    .first {
                        display: flex;
                        background-color: #201240;
                        padding: 40px;
                        font-family: 'Arial';
                        font-size: 40pt;
                        color: white;
                    }

                    .second {
                        display: flex;
                        padding-top: 50px;
                        padding-bottom: 50px;
                        background-color: #502D73;
                    }

                    .third {
                        display: flex;
                        background-color: #201240;
                        font-family: 'Arial';
                        font-size: 12pt;
                        color: white;
                        padding: 5px;
                    }

                    button {
                        outline: none;
                        border: none;
                        border-radius: 25px;
                        cursor: pointer;
                        padding: 35px 100px 35px 100px;
                        background-color: #F28E13;
                        font-family: 'Arial';
                        font-size: 32pt;
                        color: white;
                    }

                    a {
                        margin: 0 auto;
                    }
                </style>
            </head>

            <body>
                <div class="first">SpaceNotes - ${main}</div>
                <div class="second">
                    <a href="${config.domain}/${path}?c=${code}"><button><b>${btnText}</b></button></a>
                </div>
                <div class="third">Generated automatically. Don't reply for this e-mail.</div>
            </body>
        </html>
    `
}