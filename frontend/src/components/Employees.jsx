import React, {useState, useEffect} from "react";

function Employees(){

    const [employees, setEmployees] = useState([]);

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


    //returns our data in html
    return(
        <div>
        {employees.map(employee =>(
            <h1 key={employee.employee_id}>{employee.fName}</h1>
        ))}
        </div>
    );
}

export default Employees;