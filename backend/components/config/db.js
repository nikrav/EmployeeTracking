/* eslint-disable no-unused-vars */
const mysql = require('mysql2')
require('dotenv').config()

const pool = mysql.createPool({
    connectionLimit: 10,
    host: database-1.c50ee2aam39b.eu-north-1.rds.amazonaws.com,
    user: root,
    password: Vkvrrn123,
    database: emp
})

module.exports = pool
