import React, { useState, useEffect } from "react";
import WriteJournals from "./WriteJournals";
import PrintJournals from "./PrintJournals"

function Journals() {
    //our states to get the journal data
    const [journals, setJournals] = useState([]);
    //our states to enter new journal data

    //the information we are getting from the backend
    useEffect(() => {
        //get request
        fetch(process.env.REACT_APP_PROXY + "/journals")
            //turns data into json
            .then(res => res.json())
            //put the data into the journals state
            .then(journalData => setJournals(journalData))
            //catches errors
            .catch(err => console.log(err));
    }, []);
    // [] at the end determines when to make the request, [ ] by itself only makes the request once

    //return the html
    return (
        <div>
            <PrintJournals journalsToPrint={journals}/>
            <WriteJournals />
        </div>
    );
};

export default Journals;