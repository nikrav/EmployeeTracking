import React, { useState } from "react";
import DeleteJournal from "./DeleteJournal"
const _ = require("lodash");

function PrintJournals(props) {
    const [journalToDelete, setJournalToDelete] = useState(0);
    //css for card color, it can change
    // eslint-disable-next-line no-unused-vars
    let cardColor;

    return (
        <div>
            {
                //if journal is being selected to delete siplay this, also pass the parents function into the props
                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <DeleteJournal changeState={props.changeState} state={props.state} journal_id={journalToDelete}/>
                </div>
            }
            {props.journalsToPrint.map((journal) => {
                //changes the format of the date
                const journalDate = new Date(journal.j_date.substring(0, 4), journal.j_date.substring(5, 6), journal.j_date.substring(8, 10)).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" });

                return (
                    <div key={journal.journal_id} className="row px-4 my-5 position-relative">

                        {/* centers the journals */}
                        <div className="col-md-4" />
                        <div className="card col-12 col-md-4 my-2 p-0">
                            <div className={
                                //sepending on what the journal information is we will change the class name
                                _.lowerCase(journal.good_bad_info) === "good" ? cardColor = "card-header text-bg-primary"
                                    : _.lowerCase(journal.good_bad_info) === "bad" ? cardColor = "card-header text-bg-danger"
                                        : cardColor = "card-header text-bg-white"}>
                                <h5 className="ms-0 mb-0 d-inline-block">{_.upperFirst(journal.good_bad_info)}</h5> <button data-bs-toggle="modal" data-bs-target="#deleteModal" type="button" className="d-inline-block position-absolute end-0 me-4 mb-0 btn-close" aria-label="Close" onClick={() => setJournalToDelete(journal.journal_id) }></button>
                            </div>
                            <div className="card-body">
                                <h2 className="text-center">{journal.fName + " " + journal.lName}</h2>
                                <p className="my-3 p-1 border border-3 rounded-pill">{journal.content}</p>
                            </div>
                            <div className="card-footer">
                                <p className="d-inline-block mb-0 ms-0">{journalDate}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PrintJournals;