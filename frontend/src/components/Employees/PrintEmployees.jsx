import React, { useEffect, useState } from "react";
import OneEmployeesJournals from "../Journals/OneEmployeesJournals";

function PrintEmployees() {
    const [employees, setEmployees] = useState([]);
    //send this with get request to order page
    const [orderBy, setOrderBy] = useState("Name");
    //turn employee overlay off at start, represented by 0
    const [employeeOverlay, setEmployeeOverlay] = useState(false);
    const [clickedEmployee, setClickedEmpoyee] = useState("")

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
            {/* if the employee overlay is toggled then display it */}
            {employeeOverlay && <OneEmployeesJournals id={clickedEmployee}/> }
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
                        //on click we are going to pass the emplooyee_id to the setClickedEmployee and activate the overlay
                        <tr key={employee.employee_id} onClick={() => {setClickedEmpoyee(employee.employee_id); setEmployeeOverlay(true);}}>
                            <td>{employee.fName}</td>
                            <td>{employee.numOfJournals}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );

    function orderByName() {
        setOrderBy("Name");
    };

    function orderByGood() {
        setOrderBy("Good");
    };

    function orderByInfo() {
        setOrderBy("Info");
    };

    function orderByTotal() {
        setOrderBy("Total")
    }

    function orderByBad() {
        setOrderBy("Bad");
    };

};

export default PrintEmployees;
