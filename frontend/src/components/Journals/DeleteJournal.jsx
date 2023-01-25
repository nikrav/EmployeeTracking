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
        <div className="position-fixed top-50 start-50 translate-middle my-modal">
            <div className="card">
                <div className="card-header"><h3>Are You Sure You Want to Delete This Journal?</h3></div>
                <div className="card-body">
                    {/* if we click no, then we will set the parent state back to the original no deletion state */}
                    <button type="button" className="btn btn-success" onClick={() => props.setDeleteState(false)}>No, Go Back</button>
                    <button type="button" className="btn btn-danger" onClick={() => { deleteJournal(); props.setDeleteState(false); }}>Yes, Delete It</button>
                </div>
            </div>
        </div>
    );

};

export default DeleteJournal;
