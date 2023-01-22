import React, { useState, useEffect } from "react";

function Employees() {

    const [employees, setEmployees] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    //the information we are getting from the backend
    useEffect(() => {
        //get request
        fetch(process.env.REACT_APP_PROXY + "/employees")
            //turns data into json
            .then(res => res.json())
            //sets the employee data to the data we can use in the state
            .then(employeesData => setEmployees(employeesData))
            //catches errors
            .catch(err => console.log(err));
    }, []);
    // [] at the end determines when to make the request, [ ] by itself only makes the request once

    //handles the submit request by sending a post request
    function handleSubmit(evt){
        //stops page from refreshing after submit
        // evt.preventDefault();
        //object we are going to send/post
        const employee = {
            fName: firstName, 
            lName: lastName
        }

        //sends the post request
        fetch(process.env.REACT_APP_PROXY + "/employees-add", {
            //type of method we are doing
            method: "POST",
            //type of information we are sending
            headers: {  "Content-Type": "application/json" },
            //data we are sending
            body: JSON.stringify(employee)
        }).then(()=>{
            console.log("New Employee Added");
        })
    }

    function deleteEmployee(){
        //stops page from refreshing after submit
        // evt.preventDefault();
        //object we are going to send/post
        const employee = {
            fName: firstName, 
            lName: lastName
        }

        //sends the post request
        fetch(process.env.REACT_APP_PROXY + "/employees-delete", {
            //type of method we are doing
            method: "DELETE",
            //type of information we are sending
            headers: {  "Content-Type": "application/json" },
            //data we are sending
            body: JSON.stringify(employee)
        }).then(()=>{
            console.log("Employee Removed");
        })
    }

    //returns our data in html
    return (
        <div>
            {employees.map(employee => (
                <h1 key={employee.employee_id}>{employee.fName}</h1>
            ))}
            <form onSubmit={handleSubmit}>
                <label>Enter First Name</label>
                <input type="text" name="fName" required onChange={(change) => setFirstName(change.target.value)}/>
                <label>Enter Last Name</label>
                <input type="text" name="lName" required onChange={(change) => setLastName(change.target.value)}/>
                <button type="submit">Add Employee</button>
            </form>
            {/* CHANGE VARIABLE OR HANDLE INSERTION AND DELETION DIFFERENTLY BECAUSE IF YOU CHANGE THE INSERTION AND HIT DELETE IT WILL DELETE THE NAMES IN INSERTION */}
            <h1>DELETE EMPLOYEE</h1>
            <form onSubmit={deleteEmployee}>
                <label>Enter First Name</label>
                <input type="text" name="fName" required onChange={(change) => setFirstName(change.target.value)}/>
                <label>Enter Last Name</label>
                <input type="text" name="lName" required onChange={(change) => setLastName(change.target.value)}/>
                <button type="submit">DELETE EMPLOYEE</button>
            </form>
        </div>
    );
};

export default Employees;