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

    addTest() {
        console.log('ex')
    }

    userAdd(data, response) {
        this.connect()
        this.client.query(sql("SELECT * FROM users WHERE email=:email")({ email: data.email }), (err, res) => {
            if (res.rows.length == 0) {
                data.code = uniqid(uniqid(), uniqid())
                data.verified = false
                this.client.query(sql("INSERT INTO users (firstName, lastName, email, password, code, verified) VALUES (:firstName, :lastName, :email, :password, :code, :verified)")(data), (err, res) => {
                    this.client.end()
                    if (err == null) {
                        mail.verificationEmail(data.code)
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
        this.client.query(sql("SELECT * FROM users WHERE email=:email")({ email: data.email }), (err, res) => {
            bcrypt.compare(data.password, res.rows[0].password, function (err, result) {
                if (result) {
                    if (res.rows[0].verified) response.end(JSON.stringify({ status: "success", code: res.rows[0].code }))
                    else response.end(JSON.stringify({ status: "fail", status: "Verify your account" }))
                } else response.end(JSON.stringify({ status: "fail", status: "Invalid E-mail or password" }))
            })
        })
    }
}