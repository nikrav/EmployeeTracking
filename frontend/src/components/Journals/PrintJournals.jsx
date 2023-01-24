import React from "react";

function PrintJournals(props){
    return(
        <div>
            {props.journalsToPrint.map((journal) => {
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
        </div>
    );
};

export default PrintJournals;