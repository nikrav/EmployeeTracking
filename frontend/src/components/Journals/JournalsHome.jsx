import React, { useState, useEffect } from "react";
import WriteJournals from "./WriteJournals";
import PrintJournals from "./PrintJournals"

function Journals(props) {
    //our states to get the journal data
    const [journals, setJournals] = useState([]);
    //this state will be switched everytime in order to reset the journal flow
    const [stateTracker, setStateTracker] = useState(false)
    //option to show all journals, good journals, bad journals, or infor journals
    const [show, setShow] = useState("All");

    var findEmployee;

    //if props.oneEmployee does not exist then we display all messages else display that employees messages
    if (props.id === undefined) {
        findEmployee = "";
    } else {
        findEmployee = "/&employee_id=" + props.id;
    }

    //the information we are getting from the backend
    useEffect(() => {
        //get request
        fetch(process.env.REACT_APP_PROXY + "/journals?show=" + show + findEmployee )
            //turns data into json
            .then(res => res.json())
            //put the data into the journals state
            .then(journalData => { setJournals(journalData);; })
            //catches errors
            .catch(err => console.log(err));
    }, [findEmployee, stateTracker, show]);
    // [] at the end determines when to make the request, [ ] by itself only makes the request once

    //return the html
    return (
        <div>
            <div className="mt-5 add-journal-btn row">
                <div className="col-5"></div>
                <div className="col-2 p-0">
                    <div className="dropdown d-inline-block">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Show
                        </button>
                        <ul className="dropdown-menu">
                            {/*When a button is clicked, it changes the show state so that the order can be changed in the get request */}
                            <li><button onClick={() => setShow("All")} className="dropdown-item">All</button></li>
                            <li><button onClick={() => setShow("Good")} className="dropdown-item">Good</button></li>
                            <li><button onClick={() => setShow("Info")} className="dropdown-item">Info</button></li>
                            <li><button onClick={() => setShow("Bad")} className="dropdown-item">Bad</button></li>
                        </ul>
                    </div>
                    <button data-bs-toggle="modal" data-bs-target="#addJournalModal" type="button" className="btn btn-primary d-inline-block float-end">Add Journal</button>
                </div>
            </div>
            <div className="modal fade" id="addJournalModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                {/* should reset journal after submitting */}
                {!stateTracker && <WriteJournals changeState={setStateTracker} state={stateTracker} />}
                {stateTracker && <WriteJournals changeState={setStateTracker} state={stateTracker} />}
            </div>
            <PrintJournals journalsToPrint={journals} changeState={setStateTracker} state={stateTracker} />
        </div>
    );
};

export default Journals;