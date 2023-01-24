import React, {useState} from "react";

function DeleteEmployee() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    function handleClick() {
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

    return (
        <div>
            <h1>DELETE EMPLOYEE</h1>
            <form onSubmit={handleClick}>
                <label>Enter First Name</label>
                <input type="text" name="fName" required onChange={(change) => setFirstName(change.target.value)} />
                <label>Enter Last Name</label>
                <input type="text" name="lName" required onChange={(change) => setLastName(change.target.value)} />
                <button type="submit">DELETE EMPLOYEE</button>
            </form>
        </div>
    )
};

export default DeleteEmployee;