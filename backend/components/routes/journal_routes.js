/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const pool = require('./db.js');

//get all journals
//it is / because the app in server.js adds the "/journals" already
router.route("/")
    .get(async (req, res) => {
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

    .post(async (req, res) => {
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
    //uses body requests, it does not say this is bad but it could be looked into
    .delete((req, res) => {
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