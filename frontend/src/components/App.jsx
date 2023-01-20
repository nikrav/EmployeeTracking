import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employees from "./Employees";
import Layout from "./Layout";
import Login from "./Login";
import Home from "./Home";

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home/>}/>
                    <Route path="employees" element={<Employees />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;