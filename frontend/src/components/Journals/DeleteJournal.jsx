import React from "react"
import authHeader from "../services/auth_header"

function DeleteJournal(props) {

    function deleteJournal() {

        //stops page from refreshing after submit
        // evt.preventDefault()
        //object we are going to send/post
        const employee = {
            journal_id: props.journal_id
        }

        //sends the post request
        fetch(process.env.REACT_APP_PROXY + "/journals", {
            //type of method we are doing
            method: "DELETE",
            //type of information we are sending

            headers: { "Content-Type": "application/json", "x-access-token": authHeader() },
            //data we are sending
            body: JSON.stringify(employee)
        })
            //if props state is true then we set it to false, and vice versa, this will reload the journals
            .then((response) => {
                props.changeState(props.state ? false : true)
                if (response.status === 401 || response.status === 403) {
                    alert("Requires Admin Account")

                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">Delete This Journal?</h3>
                </div>
                <div className="modal-body">
                    <p>This action cannot be undone, are you sure you want to delete this journal?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-success" data-bs-dismiss="modal">No, Go Back</button>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => deleteJournal()}>Yes, Delete It</button>
                </div>
            </div>
        </div>
    )

}

export default DeleteJournal
