import React, { useState, useEffect } from "react";

function Employees() {

    const [employees, setEmployees] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    //send this with get request to order page
    const [orderBy, setOrderBy] = useState("Name");

    //the information we are getting from the backend
    useEffect(() => {
        //get request
        fetch(process.env.REACT_APP_PROXY + "/employees?orderBy=" + orderBy)
            //turns data into json
            .then(res => res.json())
            //sets the employee data to the data we can use in the state
            .then(employeesData => setEmployees(employeesData))
            //catches errors
            .catch(err => console.log(err));
    }, [orderBy]);
    // [] at the end determines when to make the request, [ ] by itself only makes the request once


    //returns our data in html
    return (
        <div>
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Order By
                </button>
                <ul className="dropdown-menu">
                    <li><button onClick={orderByName} className="dropdown-item">Name</button></li>
                    <li><button onClick={orderByTotal} className="dropdown-item">Total</button></li>
                    <li><button onClick={orderByGood} className="dropdown-item">Good</button></li>
                    <li><button onClick={orderByInfo} className="dropdown-item">info</button></li>
                    <li><button onClick={orderByBad} className="dropdown-item">Bad</button></li>
                </ul>
            </div>
            <p>Currently Ordered By: {orderBy}</p>
            <table className="table table-light table-hover">
                <thead>
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">{orderBy === "Name" ? "Total" : orderBy} Journals</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        //has ternary operator to decide what to place, if orderBy === name then we display total, else we display what is in order by
                        <tr key={employee.employee_id}>
                            <td>{employee.fName}</td>
                            <td>{employee.numOfJournals}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <form onSubmit={handleSubmit}>
                <label>Enter First Name</label>
                <input type="text" name="fName" required onChange={(change) => setFirstName(change.target.value)} />
                <label>Enter Last Name</label>
                <input type="text" name="lName" required onChange={(change) => setLastName(change.target.value)} />
                <button type="submit">Add Employee</button>
            </form>
            {/* CHANGE VARIABLE OR HANDLE INSERTION AND DELETION DIFFERENTLY BECAUSE IF YOU CHANGE THE INSERTION AND HIT DELETE IT WILL DELETE THE NAMES IN INSERTION */}
            <h1>DELETE EMPLOYEE</h1>
            <form onSubmit={deleteEmployee}>
                <label>Enter First Name</label>
                <input type="text" name="fName" required onChange={(change) => setFirstName(change.target.value)} />
                <label>Enter Last Name</label>
                <input type="text" name="lName" required onChange={(change) => setLastName(change.target.value)} />
                <button type="submit">DELETE EMPLOYEE</button>
            </form>
        </div>
    );

    function orderByName() {
        setOrderBy("Name");
    }

    function orderByGood() {
        setOrderBy("Good");
    }

    function orderByInfo() {
        setOrderBy("Info");
    }

    function orderByTotal() {
        setOrderBy("Total")
    }

    function orderByBad() {
        setOrderBy("Bad");
    }

    //handles the submit request by sending a post request
    function handleSubmit(evt) {
        //stops page from refreshing after submit
        // evt.preventDefault();
        //object we are going to send/post
        const employee = {
            fName: firstName,
            lName: lastName
        }

        //sends the post request
        fetch(process.env.REACT_APP_PROXY + "/employees", {
            //type of method we are doing
            method: "POST",
            //type of information we are sending
            headers: { "Content-Type": "application/json" },
            //data we are sending
            body: JSON.stringify(employee)
        }).then(() => {
            console.log("New Employee Added");
        })
    }

    function deleteEmployee() {
        //stops page from refreshing after submit
        // evt.preventDefault();
        //object we are going to send/post
        const employee = {
            fName: firstName,
            lName: lastName
        }

        //sends the post request
        fetch(process.env.REACT_APP_PROXY + "/employees", {
            //type of method we are doing
            method: "DELETE",
            //type of information we are sending
            headers: { "Content-Type": "application/json" },
            //data we are sending
            body: JSON.stringify(employee)
        }).then(() => {
            console.log("Employee Removed");
        })
    }

};

export default Employees;