/* eslint-disable no-unused-vars */
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../config/db")
let user;
let role;
let token = null;

exports.signin = (req, res) => {

    pool.getConnection((err, conn) => {
        //find the requested user
        if (err) throw err; //not connected
        //query the database

        const qry = "SELECT * FROM users WHERE username=?";
        
        conn.query(qry, [req.body.username], function (error, result) {
            //send the result in a json
            conn.release();
            if (error) throw error;
            user = result;
            //if no user is found then send this
            if (user.length === 0) {
                return res.status(404).send({ message: "User Not found." });
            } else{
                bcrypt.compare(req.body.password, user[0].hash, function (err, result) {
                    //if password is right
                    if (result) {
                        token = jwt.sign({ id: user[0].user_id }, process.env.SECRET, {
                            expiresIn: 86400 // 24 hours
                        });
                        res.status(200).send({
                            id: user.id,
                            username: user.username,
                            roles: role,
                            accessToken: token
                        });
                    } else {
                            res.status(401).send({
                            accessToken: null,
                            message: "Invalid Password!"
                        });
                    }
                })
            }
        })
    })
};