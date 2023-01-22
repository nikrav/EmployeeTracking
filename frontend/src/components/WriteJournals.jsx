import React, { useState } from "react";

function WriteJournals() {

    const [employeeFullName, setEmployeeFullName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [employeeID, setEmployeeID] = useState("");
    const [newJournalDate, setNewJournalDate] = useState("");
    const [journalType, setJournalType] = useState("");
    const [firstTime, setFirstTime] = useState(1);
    const [info, setInfo] = useState("");
    const [journalID, setJournalID] = useState("");

    //handles the submit request by sending a post request
    function handleSubmit(evt) {
        //stops page from refreshing after submit
        evt.preventDefault();
        //if it is the first time we are only getting the name
        if (firstTime === 1) {
            //object we are going to send/post
            const employee = {
                fName: firstName,
                lName: lastName
            }
            setEmployeeFullName(firstName + " " + lastName);
            fetch(process.env.REACT_APP_PROXY + "/employees-search", {
                //type of method we are doing
                method: "POST",
                //type of information we are sending
                headers: { "Content-Type": "application/json" },
                //data we are sending
                body: JSON.stringify(employee)
            }).then(res => res.json())
                //sets the employees id
                .then(employeeData => setEmployeeID(employeeData[0].employee_id))
                //catches errors
                .catch(err => console.log(err));
                //0 represents false, move the state of the page along
                setFirstTime(0);

        } else {
            //object we are going to send/post
            const journal = {
                receivingID: employeeID,
                journalTypeInfo: journalType,
                journalDate: newJournalDate,
                content: info,
                givingFirst: firstName,
                givingLast: lastName
            }

            console.log(journal);
            fetch(process.env.REACT_APP_PROXY + "/journals-add", {
                //type of method we are doing
                method: "POST",
                //type of information we are sending
                headers: { "Content-Type": "application/json" },
                //data we are sending
                body: JSON.stringify(journal)
            }).catch(err => console.log(err));
            //reloads the page and resets the values
            window.location.reload();
        }


    }

    function deleteJournal(){
        //stops page from refreshing after submit
        // evt.preventDefault();
        //object we are going to send/post
        const employee = {
            journal_id: journalID
        }

        //sends the post request
        fetch(process.env.REACT_APP_PROXY + "/journals-delete", {
            //type of method we are doing
            method: "DELETE",
            //type of information we are sending
            headers: {  "Content-Type": "application/json" },
            //data we are sending
            body: JSON.stringify(employee)
        }).then(()=>{
            console.log("Journal Removed");
        })
    }

    if (employeeID === "") {
        return (
            <div>
            <form onSubmit={handleSubmit}>
                <label>Enter First Name</label>
                <input type="text" name="fName" required onChange={(change) => setFirstName(change.target.value)} />
                <label>Enter Last Name</label>
                <input type="text" name="lName" required onChange={(change) => setLastName(change.target.value)} />
                <button type="submit">Search Employees</button>
            </form>
            <h1>DELETE JOURNAL</h1>
            <form onSubmit={deleteJournal}>
                <label>Enter Journal Number</label>
                <input type="text" name="fName" required onChange={(change) => setJournalID(change.target.value)} />
                <button type="submit">DELETE JOURNAL</button>
            </form>
            </div>);
    } else {

        return (
            <div>
                <h1>{employeeFullName + " ID: " + employeeID}</h1>
                <form onSubmit={handleSubmit}>
                    <label>Enter Date</label>
                    <input type="date" required onChange={(change) => setNewJournalDate(change.target.value)} />
                    <label>Enter Type (good, bad neutral)</label>
                    <input type="text" required onChange={(change) => setJournalType(change.target.value)} />
                    <label>Enter The Information</label>
                    <input type="text" name="fName" required onChange={(change) => setInfo(change.target.value)} />
                    <label>Enter Your First Name</label>
                    <input type="text" name="fName" required onChange={(change) => setFirstName(change.target.value)} />
                    <label>Enter Your Last Name</label>
                    <input type="text" name="lName" required onChange={(change) => setLastName(change.target.value)} />
                    <button type="submit">Add Journal</button>
                </form>
            </div>
        );
    }

}

export default WriteJournals;