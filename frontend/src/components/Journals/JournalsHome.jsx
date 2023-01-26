import React, { useState, useEffect } from "react";
import WriteJournals from "./WriteJournals";
import PrintJournals from "./PrintJournals"

function Journals(props) {
    //our states to get the journal data
    const [journals, setJournals] = useState([]);
    //this state will be switched everytime in order to reset the journal flow
    const [stateTracker, setStateTracker] = useState(false)
    
    var fetchAddress;

    //if props.oneEmployee does not exist then we display all messages else display that employees messages
    if(props.id === undefined){
        fetchAddress = process.env.REACT_APP_PROXY + "/journals";
    } else{
        fetchAddress = process.env.REACT_APP_PROXY + "/journals?employee_id=" + props.id;
    }

    //the information we are getting from the backend
    useEffect(() => {
        //get request
        fetch(fetchAddress)
            //turns data into json
            .then(res => res.json())
            //put the data into the journals state
            .then(journalData => {setJournals(journalData);;})
            //catches errors
            .catch(err => console.log(err));
    }, [fetchAddress, stateTracker]);
    // [] at the end determines when to make the request, [ ] by itself only makes the request once

    //return the html
    return (
        <div>
            <PrintJournals journalsToPrint={journals} changeState={setStateTracker} state={stateTracker}/>
            <h3 className="text-center"><u>Add a New Journal</u></h3>
            <WriteJournals changeState={setStateTracker} state={stateTracker}/>
        </div>
    );
};

export default Journals;