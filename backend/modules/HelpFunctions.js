module.exports = class Mail {
    constructor() { }

    static errorOnImgSave(err, response) {
        if (err) response.end(JSON.stringify({ status: "fail" }))
        else response.end(JSON.stringify({ status: "success" }))
    }
}