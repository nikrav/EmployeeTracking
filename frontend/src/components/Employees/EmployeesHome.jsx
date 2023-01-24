import PrintEmployees from "./PrintEmployees";
import AddEmployee from "./AddEmployee";
import DeleteEmployee from "./DeleteEmployee";

function Employees() {
    return(
        <div>
            <PrintEmployees />
            <AddEmployee />
            <DeleteEmployee />
        </div>
    )
};

export default Employees;