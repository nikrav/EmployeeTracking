/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const pool = require('./db.js');

//for the employees route that allows us to access the employee table in the db
//it is / because the app adds the "/employees" already
router.route("/")
    //get all employees or a singular employee
    .get(async (req, res) => {
        //find all employees if fName does not exist
        if (req.query.fName == null) {
            console.log("Requesting All Employees");
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
        }
        //if fName does exist find the employee with fName and lName
        else {
            console.log("Searching Employees");
            const fName = req.query.fName;
            const lName = req.query.lName;
            pool.getConnection((err, conn) => {
                if (err) throw err; //not connected
                //query the database
                const qry = "SELECT employee_id FROM employees WHERE employees.fName=? AND employees.lName=?;"
                conn.query(qry, [fName, lName], function (error, result, fields) {
                    //send the result in a json
                    conn.release();
                    if (error) throw error;
                    res.json(result);
                })
            })
        }
    })
    //add a new employee
    .post((req, res) => {
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
    //delete an employee
    //uses body requests, it does not say this is bad but it could be looked into
    .delete((req, res) => {
        //get the information that we want to add
        console.log("Requested to Delete Employee");
        const fName = req.body.fName;
        const lName = req.body.lName;

        //connect to the database
        pool.getConnection((err, conn) => {
            if (err) throw err;
            //IS BAD FOR PEOPLE WITH THE SAME NAME, DELETES THEM BOTH
            //set up the string, the ? ? represent variables that we will imput later
            const qry = "DELETE FROM employee_tracker.employees WHERE (fName=? AND lName= ?);"
            //run the insert command
            conn.query(qry, [fName, lName], (error, result) => {
                conn.release();
                if (error) throw error;
                console.log("Employee Added");
            })
        })
    })

    //exports our routes
module.exports = router;