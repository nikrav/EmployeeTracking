import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employees from "./Employees/EmployeesHome";
import Layout from "./PageLayout/Layout";
import Home from "./Home/Home";
import Journals from "./Journals/JournalsHome";

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home/>}/>
                    <Route path="employees" element={<Employees />}/>
                    <Route path="journals" element={<Journals />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;