/* eslint-disable no-unused-vars */
//ADD LODASH TO KEEP FORMAT FOR EMPLOYEE NAMES WITH UPPERCASE

const express = require('express');
const router = express.Router();
const pool = require('./db.js');



//enter routes here
router.get("/employees", async (req, res) => {
    console.log("Requesting Employees");
    pool.getConnection((err, conn) => {
        if (err) throw err; //not connected
        //query the database
        conn.query('SELECT * FROM employees', function (error, result, fields) {
            //send the result in a json
            conn.release();
            if (error) throw error;
            res.json(result);
        })
    })
})

//find a singular employee by name, have to use a post request to get data from the server, but the post request still sends data back
router.post("/search-employees", async (req, res) => {
    console.log("Searching Employees");
    const fName = req.body.fName;
    const lName = req.body.lName;
    pool.getConnection((err, conn) => {
        if (err) throw err; //not connected
        //query the database
        const qry = "SELECT employee_id FROM employees WHERE employees.fName='" + fName +"' AND employees.lName='" + lName + "';"
        conn.query(qry, function (error, result, fields) {
            //send the result in a json
            conn.release();
            if (error) throw error;
            res.json(result);
        })
    })
})

//add an employee
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
            if (error) throw error;
            console.log("Employee Added");
        })
    })


})

//get all journals
router.get("/journals", async (req, res) => {
    console.log("Requesting Journals");
    pool.getConnection((err, conn) => {
        if (err) throw err; //not connected
        //query the database
        const qry = (
            "select journals.journal_id, employees.fName, employees.lName, journals.j_date, journals.good_bad_neutral, journals.content, giver.fName as g_fName, giver.lName as g_lName " +
            "from employees " +
            "join journals " +
            "on employees.employee_id = journals.receiving_id " +
            "join employees as giver " +
            "on giver.employee_id = journals.giving_id " + 
            "ORDER BY j_date DESC;");
        conn.query(qry, function (error, result, fields) {
            //send the result in a json
            conn.release();
            if (error) throw error;
            res.json(result);
        })
    })
})



//exports our routes
module.exports = router;