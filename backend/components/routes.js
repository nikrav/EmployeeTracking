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
router.post("/employees-search", async (req, res) => {
    console.log("Searching Employees");
    const fName = req.body.fName;
    const lName = req.body.lName;
    pool.getConnection((err, conn) => {
        if (err) throw err; //not connected
        //query the database
        const qry = "SELECT employee_id FROM employees WHERE employees.fName='" + fName + "' AND employees.lName='" + lName + "';"
        conn.query(qry, function (error, result, fields) {
            //send the result in a json
            conn.release();
            if (error) throw error;
            res.json(result);
        })
    })
})

//add an employee
router.post("/employees-add", (req, res) => {
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

//delete a single employee
router.delete("/employees-delete", (req, res) =>{
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

router.post("/journals-add", async (req, res) => {
    console.log("Adding Journal");
    //information sent to here
    const fName = req.body.givingFirst;
    const lName = req.body.givingLast;
    const receivingID = req.body.receivingID;
    const journalDate = req.body.journalDate;
    const journalType = req.body.journalTypeInfo;
    const content = req.body.content;
    console.log(journalDate);

    pool.getConnection((err, conn) => {
        if (err) throw err; //not connected
        //query the database for the giving persons id
        const qry = "SELECT employee_id FROM employees WHERE employees.fName='" + fName + "' AND employees.lName='" + lName + "';"
        conn.query(qry, function (error, result, fields) {
            if (error) throw error;
            //giving employees ID
            const givingID = result[0].employee_id;
            //insertion query
            const newQry = "INSERT INTO employee_tracker.journals (good_bad_neutral, j_date, receiving_id, giving_id, content) VALUES (?, ?, ?, ?, ?);"

            //run the second query to insert
            conn.query(newQry, [journalType, journalDate, receivingID, givingID, content], function (errorTWO, resultTWO, fieldsTWO) {
                conn.release();
                if (errorTWO) throw errorTWO;
            })
        })
    })

    pool.getConnection((err, conn) => {
        if (err) throw err;

    })
})

//delete a single journal
router.delete("/journals-delete", (req, res) =>{
    //get the information that we want to add
    console.log("Requested to Delete Journal");
    //information the server is receiving
    const journal_id = req.body.journal_id

    //connect to the database
    pool.getConnection((err, conn) => {
        if (err) throw err;
        //IS BAD FOR PEOPLE WITH THE SAME NAME, DELETES THEM BOTH
        //set up the string, the ? ? represent variables that we will imput later
        const qry = "DELETE FROM employee_tracker.journals WHERE (journal_id=?);"
        //run the insert command
        conn.query(qry, [journal_id], (error, result) => {
            conn.release();
            if (error) throw error;
            console.log("Journal Deleted");
        })
    })
})


//exports our routes
module.exports = router;