import React, { useState, useEffect } from "react";

function AddEmployee(props) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    //is ready will see if the journal is ready to submit
    const [isReady, setIsReady] = useState("false");
    //dismiss sets the string that dismisses the modal
    const [dismiss, setDismiss] = useState("");

    //update if we should submit the journal
    useEffect(() => {
        shouldSubmit();
        //if any of the states change then run shouldSubmit
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstName, lastName])

    //handles the submit request by sending a post request
    function handleClick(evt) {
        //stops page from refreshing after submit
        evt.preventDefault();

        if (!isReady) {
            alert("Please Fill Out the Entire Employee Form")
        }
        else {
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
                props.changeState(props.state ? false : true);
                setFirstName("");
                setLastName("");
            })
        }
    }

    function shouldSubmit() {
        if (firstName === "" || lastName === "") {
            setDismiss("");
            setIsReady(false);
        } else {
            //when the correct information is entered, it is ready to submit
            setIsReady(true);
            setDismiss("modal");
        }
    }

    return (
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5">Add Employee</h1>
                </div>
                <div className="modal-body">
                    <div className="mb-3">
                        <label className="me-3">Enter First Name:</label>
                        <input type="text" name="fName" required onChange={(change) => setFirstName(change.target.value)} />
                    </div>
                    <div>
                        <label className="me-3">Enter Last Name: </label>
                        <input type="text" name="lName" required onChange={(change) => setLastName(change.target.value)} />
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Nevermind</button>
                    <button type="button" className="btn btn-success" data-bs-dismiss={dismiss} onClick={handleClick}>Add {firstName} {lastName}</button>
                </div>
            </div>
        </div>
    );
};

export default AddEmployee;