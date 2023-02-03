import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav id="navbar-for-page" className="fw-bolder border-bottom border-5 opacity-100 border-dark navbar navbar-expand-lg bg-white bg-graident navbar-white">
            {/*The navbar which holds the navigation elements*/}
            {/*The navbar collapse button that is displayed when the navbar is shrunk*/}
            <button className="navbar-toggler me-4" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            {/* The navbar contents */}
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <ul className="navbar-nav ms-auto me-5">
                    <li className="nav-item px-3">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item px-3">
                        <Link to="/employees" className="nav-link">Employees</Link>
                    </li>
                    <li className="nav-item px-3">
                        <Link to="/journals" className="nav-link">Journals</Link>
                    </li>
                    <li className="nav-item px-3">
                        <Link to="/sign-in" className="nav-link">Sign-In</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;