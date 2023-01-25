import React, { useState } from "react";

function WriteJournals(props) {

    const [employeeFullName, setEmployeeFullName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [employeeID, setEmployeeID] = useState("");
    const [newJournalDate, setNewJournalDate] = useState("");
    const [journalType, setJournalType] = useState("");
    const [info, setInfo] = useState("");

    //handles the submit request by sending a post request
    function handleSubmit(evt) {
        //stops page from refreshing after submit
        evt.preventDefault();
        //url with parameters
        const url = process.env.REACT_APP_PROXY + "/employees?fName=" + firstName + "&lName=" + lastName;
        setEmployeeFullName(firstName + " " + lastName);
        fetch(url)
            .then(res => res.json())
            //sets the employees id
            .then(employeeData => {
                if (employeeData[0] === undefined) {
                    //PUT ERROR MESSAGE HERE
                    console.log("Error, user does not exist")
                } else {
                    setEmployeeID(employeeData[0].employee_id)
                }


            })
            //catches errors
            .catch(err => console.log(err));
    }

    function submitJournal(evt) {

        //stops page from refreshing after submit
        evt.preventDefault();
        //object we are going to send/post
        const journal = {
            receivingID: employeeID,
            journalTypeInfo: journalType,
            journalDate: newJournalDate,
            content: info,
            givingFirst: firstName,
            givingLast: lastName
        }
        //mmakes the emplooyee id empty so that the search bar reappears
        setEmployeeID("");

        console.log(journal);
        fetch(process.env.REACT_APP_PROXY + "/journals", {
            //type of method we are doing
            method: "POST",
            //type of information we are sending
            headers: { "Content-Type": "application/json" },
            //data we are sending
            body: JSON.stringify(journal)
            //if props state is true then we set it to false, and vice versa, this will reload the journals
        }).then(() => { props.changeState(props.state ? false : true) })
            .catch(err => console.log(err));

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
            </div>
        );
    } else {

        return (
            <div>
                <h1>{employeeFullName + " ID: " + employeeID}</h1>
                <form onSubmit={submitJournal}>
                    <label>Enter Date</label>
                    <input type="date" required onChange={(change) => setNewJournalDate(change.target.value)} />
                    <label>Enter Type (good, bad, info)</label>
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