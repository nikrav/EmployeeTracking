import React from "react";

function Login() {
    return (
        <div>
            {/* Title For Home Page */}
            <div>
                <h1 className="mt-5 text-center">Welcome to the Employee Tracker</h1>
            </div>
            {/* login */}
            <div className="mt-5 row justify-content-center">
                <div className="border border-5 col-3">
                    <h3 className="text-center">Login</h3>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input className="form-control" type="text" name="username" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input className="form-control" type="text" name="password" required />
                        </div>
                        <button className="btn btn-primary mb-2 " type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;