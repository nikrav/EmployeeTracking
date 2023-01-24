import React, {useEffect, useState} from "react";
import PrintJournals from "./PrintJournals";

function OneEmployeesJournals(props){

    const [employeeData, setEmployeeData] = useState([]);

    //the information we are getting from the backend
    useEffect(() => {
        //get request
        fetch(process.env.REACT_APP_PROXY + "/journals?employee_id=" + props.id)
            //turns data into json
            .then(res => res.json())
            //sets the employee data to the data we can use in the state
            .then(employeesData => setEmployeeData(employeesData))
            //catches errors
            .catch(err => console.log(err));
    }, [props.id]);
    //if prop id changes it will refresh

    return(
        <PrintJournals journalsToPrint={employeeData}/>
    );
};

export default OneEmployeesJournals;