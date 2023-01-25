/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();
const pool = require("./db.js");

//for the employees route that allows us to access the employee table in the db
//it is / because the app adds the "/employees" already
router.route("/")
    //get all employees or a singular employee
    .get(async (req, res) => {

        //find all employees if fName does not exist
        if (req.query.fName == null) {

            //get the order by field
            const orderBy = req.query.orderBy;
            console.log(orderBy);
            //string we will add to the end of the query to determine what it will be ordered by
            let qryEnd;

            switch(orderBy){
                case "Good":
                    qryEnd = "numOfGood DESC, lName, fName";
                    break;
                case "Bad":
                    qryEnd = "numOfBad DESC, lName, fName";
                    break;
                case "Info":
                    qryEnd = "numOfInfo DESC, lName, fName";
                    break;
                case "First Name":
                    qryEnd = "fName, lName";
                    break;
                case "Last Name":
                    qryEnd = "lName, fName";
                    break;
                case "Total":
                    qryEnd = "numOfTotal DESC, lName, fName";
                    break;
                default:
                    qryEnd = "lName, fName";
                    break;
            }

            //qry we want to run
            const qry = 
            `SELECT employees.employee_id, employees.fName, employees.lName,  (count(goodJournals.good_bad_info) + count(badJournals.good_bad_info) + count(infoJournals.good_bad_info)) as numOfTotal ,count(goodJournals.good_bad_info) as numOfGood, count(infoJournals.good_bad_info) as numOfInfo, count(badJournals.good_bad_info) as numOfBad
            FROM employees
            LEFT JOIN journals as infoJournals
            ON infoJournals.receiving_id=employee_id AND infoJournals.good_bad_info="info"
            LEFT JOIN journals as goodJournals
            ON goodJournals.receiving_id=employee_id AND goodJournals.good_bad_info="good"
            LEFT JOIN journals as badJournals
            ON badJournals.receiving_id=employee_id AND badJournals.good_bad_info="bad"
            GROUP BY employee_id, infoJournals.good_bad_info, goodJournals.good_bad_info, badJournals.good_bad_info
            ORDER BY `
            console.log("Requesting All Employees");


            pool.getConnection((err, conn) => {
                if (err) throw err; //not connected
                //query the database
                //if you use qrt, [endQry] it does not work because it adds ''
                conn.query(qry + qryEnd + ";", function (error, result, fields) {
                    //send the result in a json
                    conn.release();
                    if (error) throw error;
                    res.json(result);
                })
            })
        }
        //if fName does exist and lName does not
        else if (req.query.lName == null){
            console.log("Searching Employees");
            const fName = req.query.fName;
            pool.getConnection((err, conn) => {
                if (err) throw err; //not connected
                //query the database for employees whose last name or first name is like the one entered
                const qry = "SELECT employee_id, employees.fName, employees.lName FROM employees WHERE employees.fName LIKE '%" + fName + "%' OR employees.lName LIKE '%" + fName + "%' ORDER BY lName, fName;"
                conn.query(qry, function (error, result, fields) {
                    //send the result in a json
                    conn.release();
                    if (error) throw error;
                    res.json(result);
                })
            })
        } 
        //if there is both a fName and a lName
        else{
            console.log("Searching Employees");
            const fName = req.query.fName;
            const lName = req.query.lName;
            pool.getConnection((err, conn) => {
                if (err) throw err; //not connected
                //query the database for employees whose last name or first name is like the one entered
                const qry = "SELECT employee_id, employees.fName, employees.lName FROM employees WHERE employees.fName LIKE '%" + fName + "%' AND employees.lName LIKE '%" + lName + "%' ORDER BY lName, fName;"
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
            const insertQry = "INSERT INTO employees (fName, lName) VALUES (?, ?);";
            //run the insert command
            conn.query(insertQry, [fName, lName], (error, result) => {
                conn.release();
                if (error) throw error;
                res.json(result);
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
                res.json(result);
                console.log("Employee Added");
            })
        })
    })

//exports our routes
module.exports = router;