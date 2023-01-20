import React from "react";

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
                    <h3>How to Use</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;