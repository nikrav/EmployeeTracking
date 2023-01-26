import React, { useState } from "react";
import SearchEmployees from "../CustomComponents/SearchEmployees";

function WriteJournals(props) {

    // const [employeeFullName, setEmployeeFullName] = useState("");
    const [employeeID, setEmployeeID] = useState("");
    const [newJournalDate, setNewJournalDate] = useState("");
    const [journalType, setJournalType] = useState("Type");
    const [info, setInfo] = useState("");
    const [cardColor, setCardColor] = useState("");
    const [showInfo, setShowInfo] = useState(false);
    const [showInfoGiving, setShowInfoGiving] = useState(false);
    const [employeeIDGiving, setEmployeeIDGiving] = useState("");

    function submitJournal(evt) {

        //stops page from refreshing after submit
        evt.preventDefault();


        //if nothing is udefined do the submission
        if (info === "" || employeeIDGiving === "" || journalType === "Type" || employeeID === "" || newJournalDate === "") {
            alert("Please Fill Out the Entire Journal Form")
        }
        else {

            //object we are going to send/post
            const journal = {
                receivingID: employeeID,
                journalTypeInfo: journalType,
                journalDate: newJournalDate,
                content: info,
                givingID: employeeIDGiving
            }

            console.log(journal);

            fetch(process.env.REACT_APP_PROXY + "/journals", {
                //type of method we are doing
                method: "POST",
                //type of information we are sending
                headers: { "Content-Type": "application/json" },
                //data we are sending
                body: JSON.stringify(journal)
                //if props state is true then we set it to false, and vice versa, this will reload the journals
            }).then(() => { props.changeState(props.state ? false : true); })
                .catch(err => console.log(err));
        }

    }


    return (

        <div className="row px-4 my-5 position-relative">
            {/* centers the journals */}
            <div className="col-md-4" />
            <div className="card col-12 col-md-4 my-2 p-0">
                <div className={"card-header " + cardColor}>
                    <button className="btn btn-secondary dropdown-toggle ms-0 mb-0 d-inline-block" type="button" data-bs-toggle="dropdown" aria-expanded="false">{journalType}</button>
                    <button type="button" className="btn btn-secondary" style={{ position: "relative", float: "right" }} onClick={submitJournal}>Add Journal</button>
                    <ul className="dropdown-menu">
                        {/*When a button is clicked, it changes the orderBy state so that the order can be changed in the get request */}
                        <li><button onClick={() => { setJournalType("Good"); setCardColor("text-bg-primary") }} className="dropdown-item">Good</button></li>
                        <li><button onClick={() => { setJournalType("Info"); setCardColor("text-bg-white") }} className="dropdown-item">Info</button></li>
                        <li><button onClick={() => { setJournalType("Bad"); setCardColor("text-bg-danger") }} className="dropdown-item">Bad</button></li>
                    </ul>
                </div>
                <div className="card-body search-bar-dropdown">
                    <SearchEmployees setID={setEmployeeID} setShow={setShowInfo} show={showInfo} onClickOutside={() => { setShowInfo(false) }} />
                    <textarea className="mt-3 mb-0 p-1 border border-3 text-box" onChange={(e) => setInfo(e.target.value)}></textarea>
                </div>
                <div className="card-footer">
                    <input type="date" className="d-inline-block mb-0 ms-0" onChange={(e) => setNewJournalDate(e.target.value)}></input>
                    <SearchEmployees classItem={{ position: "relative", float: "right" }} setID={setEmployeeIDGiving} setShow={setShowInfoGiving} show={showInfoGiving} onClickOutside={() => { setShowInfoGiving(false) }} />
                </div>
            </div>
        </div>
    );

}

export default WriteJournals;