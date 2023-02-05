import React from "react"

function Home() {
    return (
        <div>
            <div className="row justify-content-center mt-5">
                {/* Title For Home Page */}
                <div className="col-5">
                    <h1 className="mt-5">Welcome to the Employee Tracker</h1>
                </div>
            </div>
            {/* Information Section */}
            <div className="row justify-content-center mt-5">
                <div className="col-5">
                    <h3>Read Me</h3>
                    <p>
                        Hello my name is Dawson Hormuth and I am a Computer Science and Mathematics (Double Major) at
                        Frostburg State University. One of my jobs was at Chick-fil-A in LaVale, Maryland as a
                        kitchen training leader. It is my job to oversee new hire training as well as uphold kitchen policies.
                        At the store, we have a journal system that records employee actions these actions can be anything like good actions,
                        bad actions, or even general information on an employee. The journal system has many flaws: no way to see the total number of journals,
                        total number of bad journals, total number of good journals, and total number of information journals. It is hard to generate reports
                        or see improvement if we cannot have this information readily available. This website aims to fix that problem.
                    </p>
                    <h3>Goals of this Website</h3>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item ms-0">Create a MySQL database to store employee information</li>
                        <li className="list-group-item ms-0">Create a Node.js Express driven API that retrieves the infromation from the MySQL database</li>
                        <li className="list-group-item ms-0">Create a React frontend that will generate pages based on the employee database</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Home