const http = require("http")
const bcrypt = require("bcrypt")
const fs = require("fs")
const formidable = require('formidable')
const path = require("path")
const config = require('./globalConfig.json')

const Database = require("./modules/UserDatabase")
const Mail = require("./modules/Mail")
const Helper = require("./modules/HelpFunctions")
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
        req.on("end", function () {
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
        req.on("end", function () {
            userData = JSON.parse(userData)
            db.userLogin(userData, res)
        })
    }

    else if (req.url == "/userResetPassword" && req.method == "POST") {
        let userEmail = ""
        req.on("data", function (data) {
            userEmail += data
        })
        req.on("end", function () {
            userEmail = JSON.parse(userEmail)
            db.userResetPasswordFirst(userEmail)
        })
    }

    else if (req.url == "/userResetPasswordEnd" && req.method == "POST") {
        let userData = ""
        req.on("data", function (data) {
            userData += data
        })
        req.on("end", function () {
            userData = JSON.parse(userData)
            userData.password = bcrypt.hashSync(userData.password, 5)
            db.userResetPasswordSecond(userData, res)
        })
    }

    else if (req.url == "/sendImage" && req.method == "POST") {
        const form = formidable({})
        form.uploadDir = __dirname + "/files/"
        form.parse(req, function (err, fields, files) {
            if (files.file.mimetype == 'image/png') fs.rename(files.file.filepath, form.uploadDir + files.file.newFilename + '.png', (err) => Helper.errorOnImgSave(err, res))
            if (files.file.mimetype == 'image/jpeg') fs.rename(files.file.filepath, form.uploadDir + files.file.newFilename + '.jpg', (err) => Helper.errorOnImgSave(err, res))
        });
    }

    else if (req.url == "/checkSession" && req.method == "POST") {
        let userCode = ""
        req.on("data", function (data) {
            userCode += data
        })
        req.on("end", function () {
            userCode = JSON.parse(userCode)
            db.userVerifySession(userCode.user, res)
        })
    }

    else if (req.url == "/longerSession" && req.method == "POST") {
        let sessionCode = ""
        req.on("data", function (data) {
            sessionCode += data
        })
        req.on("end", function () {
            sessionCode = JSON.parse(sessionCode)
            db.userLongerSession(sessionCode.user, res)
        })
    }

    else {
        res.end()
    }
})

server.listen(PORT, function () {
    console.log("listening on *:" + PORT)
})