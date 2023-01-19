/* eslint-disable no-unused-vars */
const mysql = require('mysql')
require('dotenv').config()

const pool = mysql.createConnection({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
})

module.exports = pool;