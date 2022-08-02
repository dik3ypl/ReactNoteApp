const { Client } = require('pg')
const sql = require('yesql').pg
const bcrypt = require("bcrypt")
const uniqid = require('uniqid')
const Mail = require('./Mail')

const mail = new Mail()

module.exports = class Database {
    constructor() { }

    connect() {
        this.client = new Client("postgres://dzodqqkm:NmKRUMSZjDQjmMuIJvSidsdb6PiXIlvM@abul.db.elephantsql.com/dzodqqkm")
        this.client.connect()
    }

    userAdd(data, response) {
        this.connect()
        this.client.query(sql("SELECT * FROM users WHERE email=:email")({ email: data.email }), (err, res) => {
            if (res.rows.length == 0) {
                data.code = uniqid(uniqid(), uniqid())
                data.verified = false
                data.changePassword = false
                this.client.query(sql("INSERT INTO users (firstName, lastName, email, password, code, verified, changePassword) VALUES (:firstName, :lastName, :email, :password, :code, :verified, :changePassword)")(data), (err, res) => {
                    this.client.end()
                    if (err == null) {
                        mail.verificationEmail(data.email, data.code)
                        response.end(JSON.stringify({ status: "success" }))
                    }
                    else response.end(JSON.stringify({ status: "fail", reason: "Wrong data!" }))
                })
            } else response.end(JSON.stringify({ status: "fail", reason: "User already exists!" }))
        })
    }

    userVerify(code) {
        this.connect()
        this.client.query(sql("UPDATE users SET verified='true' WHERE code=:code")(code), (err, res) => {
            this.client.end()
        })
    }

    userLogin(data, response) {
        this.connect()
        const tmp = this
        this.client.query(sql("SELECT * FROM users WHERE email=:email")({ email: data.email }), (err, res) => {
            this.client.end()
            if (!res.rows[0]) {
                response.end(JSON.stringify({ status: "fail", reason: "Invalid e-mail or password" }))
            } else {
                bcrypt.compare(data.password, res.rows[0].password, function (err, result) {
                    if (result) {
                        if (res.rows[0].verified) {
                            const code = uniqid(uniqid(), uniqid())
                            response.end(JSON.stringify({ status: "success", uid: res.rows[0].id, code: code }))

                            tmp.connect()
                            tmp.client.query(sql("UPDATE users SET changePassword='false' WHERE email=:email")({ email: data.email }), (err, res) => {
                                tmp.client.end()
                            })
                            tmp.connect()

                            const date = `${Date.now()}`
                            tmp.client.query(sql(`INSERT INTO sessions (userId, code, date) VALUES (:id, :code, to_timestamp(${Date.now() + 10800000} / 1000))`)({ id: res.rows[0].id, code: code }), (err, res) => {
                                tmp.client.end()
                            })
                        }
                        else response.end(JSON.stringify({ status: "fail", reason: "Verify your account" }))
                    } else response.end(JSON.stringify({ status: "fail", reason: "Invalid e-mail or password" }))
                })
            }
        })
    }

    userVerifySession(uid) {
        // this.connect()
        // let currentDate = `${Date.now()}`
        // this.client.query(sql(`SELECT * FROM sessions WHERE date < to_timestamp(${Date.now() / 1000})`), (err, res) => {
        //     this.client.end()
        //     if (res) {
        //         console.log(res.rows)
        //     }
        // })
        this.connect()
        this.client.query(sql("SELECT * FROM sessions WHERE userid=:uid")({ uid: uid }), (err, res) => {
            this.client.end()
            if (res) {
                console.log(res.rows[0])
            }
        })
    }

    userResetPasswordFirst(email) {
        this.connect()
        const code = uniqid(uniqid(), uniqid())
        this.client.query(sql("UPDATE users SET changePassword='true', code=:code WHERE email=:email")({ code: code, email: email.email }), (err, res) => {
            this.client.end()
            mail.resetPassword(email.email, code)
        })
    }

    userResetPasswordSecond(data, response) {
        this.connect()
        data.newCode = uniqid(uniqid(), uniqid())
        this.client.query(sql("UPDATE users SET changePassword='false', code=:newCode, password=:password WHERE code=:code AND changePassword='true'")(data), (err, res) => {
            this.client.end()
            if (res.rowCount == 0) response.end(JSON.stringify({ status: "fail" }))
            else response.end(JSON.stringify({ status: "success" }))
        })
    }
}