const http = require("http")
const bcrypt = require("bcrypt")
const Database = require("./modules/Database")
const Mail = require("./modules/mail")
const PORT = 3001

const db = new Database()
const mail = new Mail()

const server = http.createServer(function (req, res) {
    console.log(`${req.method} ${req.url}`)

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")
    res.writeHead(200, { 'Content-Type': 'plain/text' });

    if (req.url == "/userRegister" && req.method == "POST") {
        let userData = ""
        req.on("data", function (data) {
            userData += data
        })
        req.on("end", async function () {
            userData = JSON.parse(userData)
            userData.password = bcrypt.hashSync(userData.password, 5)
            db.userAdd(userData, res)
        })
    }

    else if (req.url == "/userVerify" && req.method == "POST") {
        let userCode = ""
        req.on("data", function (data) {
            userCode += data
        })
        req.on("end", function () {
            userCode = JSON.parse(userCode)
            db.userVerify(userCode)
        })
    }

    else if (req.url == "/userLogin" && req.method == "POST") {
        let userData = ""
        req.on("data", function (data) {
            userData += data
        })
        req.on("end", async function () {
            userData = JSON.parse(userData)
            db.userLogin(userData, res)
        })
    }

    else if (req.url == "/userResetPassword" && req.method == "POST") {
        let userEmail = ""
        req.on("data", function (data) {
            userEmail += data
        })
        req.on("end", async function () {
            db.userResetPasswordFirst(userEmail)
        })
    }

    else {
        res.end()
    }
})

server.listen(PORT, function () {
    console.log("listening on *:" + PORT)
})