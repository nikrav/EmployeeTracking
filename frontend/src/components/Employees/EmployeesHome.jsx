import SearchEmployees from "../CustomComponents/SearchEmployees";
import PrintEmployees from "./PrintEmployees";
import { useState } from 'react';

function Employees() {
    let [showInfo, setShowInfo] = useState(false);

    return (
        <div>
            <SearchEmployees setShow={setShowInfo} show={showInfo} onClickOutside={() => {setShowInfo(false)}}/>
            <PrintEmployees />
        </div>
    )
};

export default Employees;