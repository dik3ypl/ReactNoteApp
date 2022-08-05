const { Client } = require('pg')
const sql = require('yesql').pg

module.exports = class Database {
    constructor() {
        this.connect()
    }

    connect() {
        this.client = new Client("postgres://dzodqqkm:NmKRUMSZjDQjmMuIJvSidsdb6PiXIlvM@abul.db.elephantsql.com/dzodqqkm")
        this.client.connect()
    }
}