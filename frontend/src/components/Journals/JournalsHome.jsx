import React, { useState, useEffect } from "react";
import WriteJournals from "./WriteJournals";

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
            {journals.map((journal) => {
                //changes the format of the date
                const journalDate = new Date(journal.j_date.substring(0, 4), journal.j_date.substring(5, 6), journal.j_date.substring(8, 10)).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});

                return (

                    <div key={journal.journal_id}>
                        <h1>Journal ID {journal.journal_id} {journal.fName + " " + journal.lName}</h1>
                        <h5>{journalDate + "      " + journal.good_bad_info}</h5>
                        <p>{journal.content}</p>
                        <p>{journal.g_fName + " " + journal.g_lName}</p>
                    </div>
                )
            })}
            <WriteJournals />
        </div>
    );
};

export default Journals;