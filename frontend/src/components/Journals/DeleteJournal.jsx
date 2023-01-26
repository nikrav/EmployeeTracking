import React from "react";

function DeleteJournal(props) {

    function deleteJournal() {

        //stops page from refreshing after submit
        // evt.preventDefault();
        //object we are going to send/post
        const employee = {
            journal_id: props.journal_id
        }

        //sends the post request
        fetch(process.env.REACT_APP_PROXY + "/journals", {
            //type of method we are doing
            method: "DELETE",
            //type of information we are sending
            headers: { "Content-Type": "application/json" },
            //data we are sending
            body: JSON.stringify(employee)
        })
            //if props state is true then we set it to false, and vice versa, this will reload the journals
            .then(() => { props.changeState(props.state ? false : true)})
            .catch(err => console.log(err));
    }

    return (
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h3 className="modal-title center-text">Delete This Journal?</h3>
                </div>
                <div className="modal-body">
                    {/* if we click no, then we will set the parent state back to the original no deletion state */}
                    <button type="button" className="mx-5 btn btn-success" data-bs-dismiss="modal">No, Go Back</button>
                    <button type="button" className="mx-5 btn btn-danger" data-bs-dismiss="modal" onClick={() => deleteJournal()}>Yes, Delete It</button>
                </div>
            </div>
        </div>
    );

};

export default DeleteJournal;
