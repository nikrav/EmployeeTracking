import React from "react"
import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"

function Layout(props){
    return(
        <>
            <NavBar checkAccount={props.checkAccount} setCheckAccount={props.setCheckAccount}/>
            <Outlet />
        </>
    )
}

export default Layout
