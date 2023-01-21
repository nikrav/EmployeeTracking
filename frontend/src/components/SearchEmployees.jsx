import React, { useState, useEffect } from "react";

function SearchEmployees() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [employeeID, setEmployeeID] = useState("");

    //handles the submit request by sending a post request
    function handleSubmit(evt) {
        //stops page from refreshing after submit
        evt.preventDefault();
        //object we are going to send/post
        const employee = {
            fName: firstName,
            lName: lastName
        }
        console.log(employee);
        fetch(process.env.REACT_APP_PROXY + "/search-employees", {
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


    }

    if (employeeID === "") {
        return (
            <form onSubmit={handleSubmit}>
                <label>Enter First Name</label>
                <input type="text" name="fName" required onChange={(change) => setFirstName(change.target.value)} />
                <label>Enter Last Name</label>
                <input type="text" name="lName" required onChange={(change) => setLastName(change.target.value)} />
                <button type="submit">Search Employees</button>
            </form>);
    } else {

        return (<h1>{employeeID}</h1>);
    }

}

export default SearchEmployees;