/* eslint-disable no-unused-vars */

const express = require('express');
const router = express.Router();
const pool = require('./db.js');

//enter routes here
router.get("/employees", async (req, res) => {
    console.log("Request Made");
    pool.getConnection((err, conn) => {
        if (err) throw err; //not connected
        //query the database
        conn.query('SELECT * FROM employees', function (error, result, fields) {
            //send the result in a json
            conn.release();
            if(error) throw error;
            res.json(result);
        })
    })
})

router.post("/add-employee", (req, res) => {
    //get the information that we want to add
    console.log("Requested to Add Employee");
    const fName = req.body.fName;
    const lName = req.body.lName;

    //connect to the database
    pool.getConnection((err, conn) => {
        if (err) throw err;

        //set up the string, the ? ? represent variables that we will imput later
        const insertQry = 'INSERT INTO employees (fName, lName) VALUES (?, ?);';
        //run the insert command
        conn.query(insertQry, [fName, lName], (error, result) => {
            conn.release();
            if(error) throw error;
            console.log("Employee Added");
        })
    })


})



//exports our routes
module.exports = router;