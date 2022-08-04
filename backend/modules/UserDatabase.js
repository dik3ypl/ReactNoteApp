const { Client } = require('pg')
const sql = require('yesql').pg
const bcrypt = require("bcrypt")
const uniqid = require('uniqid')
const Mail = require('./Mail')

const mail = new Mail()

module.exports = class Database {
    constructor() {
        this.connect()
    }

    connect() {
        this.client = new Client("postgres://dzodqqkm:NmKRUMSZjDQjmMuIJvSidsdb6PiXIlvM@abul.db.elephantsql.com/dzodqqkm")
        this.client.connect()
    }

    userAdd(data, response) {
        this.client.query(sql("SELECT * FROM users WHERE email=:email")({ email: data.email }), (err, res) => {
            if (res.rows.length == 0) {
                data.code = uniqid(uniqid(), uniqid())
                data.verified = false
                data.changePassword = false
                this.client.query(sql("INSERT INTO users (firstName, lastName, email, password, code, verified, changePassword) VALUES (:firstName, :lastName, :email, :password, :code, :verified, :changePassword)")(data), (err, res) => {
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
        this.client.query(sql("UPDATE users SET verified='true' WHERE code=:code")(code))
    }

    userLogin(data, response) {
        const tmp = this
        this.client.query(sql("SELECT * FROM users WHERE email=:email")({ email: data.email }), (err, res) => {
            if (!res.rows[0]) {
                response.end(JSON.stringify({ status: "fail", reason: "Invalid e-mail or password" }))
            } else {
                bcrypt.compare(data.password, res.rows[0].password, async (err, result) => {
                    if (result) {
                        if (res.rows[0].verified) {
                            const code = uniqid(uniqid(), uniqid())

                            await tmp.client.query(sql("UPDATE users SET changePassword='false' WHERE email=:email")({ email: data.email }))

                            await tmp.client.query(sql(`INSERT INTO sessions (userId, code, date) VALUES (:id, :code, to_timestamp(${Date.now() + 10800000} / 1000))`)({ id: res.rows[0].id, code: code }))

                            response.end(JSON.stringify({ status: "success", uid: res.rows[0].id, code: code }))
                        }
                        else response.end(JSON.stringify({ status: "fail", reason: "Verify your account" }))
                    } else response.end(JSON.stringify({ status: "fail", reason: "Invalid e-mail or password" }))
                })
            }
        })
    }

    async userVerifySession(uid, response) {
        await this.client.query(sql(`DELETE FROM sessions WHERE date < now()`)({}))

        this.client.query(sql("SELECT * FROM sessions WHERE userid=:uid")({ uid: uid }), (err, res) => {
            if (res) {
                if (res.rows.length > 0) response.end(JSON.stringify({ session: true }))
                else response.end(JSON.stringify({ session: false }))
            }
        })
    }

    async userLongerSession(uid, response) {
        await this.client.query(sql(`DELETE FROM sessions WHERE date < now()`)({}))

        this.client.query(sql(`UPDATE sessions SET date=to_timestamp(${Date.now() + 10800000} / 1000) WHERE userid=:uid`)({ uid: uid }))
    }

    async userResetPasswordFirst(email) {
        const code = uniqid(uniqid(), uniqid())

        await this.client.query(sql("UPDATE users SET changePassword='true', code=:code WHERE email=:email")({ code: code, email: email.email }))

        mail.resetPassword(email.email, code)
    }

    userResetPasswordSecond(data, response) {
        data.newCode = uniqid(uniqid(), uniqid())
        this.client.query(sql("UPDATE users SET changePassword='false', code=:newCode, password=:password WHERE code=:code AND changePassword='true'")(data), (err, res) => {
            if (res.rowCount == 0) response.end(JSON.stringify({ status: "fail" }))
            else response.end(JSON.stringify({ status: "success" }))
        })
    }
}