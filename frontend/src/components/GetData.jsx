import React, {useState, useEffect} from "react";

function GetData(){
    //the information we are getting from the backend
    const [data, setData] = useState({});

    //this gets the information
    useEffect(() => {
        //get request to the server
        fetch(process.env.REACT_APP_PROXY + "/")
        //turns response into json
        .then(res => res.json())
        //changes the data state to the data
        .then(data => setData(data))
    }, [])
    // [] at the end determines when to make the request, [ ] by itself only makes the request once

    //returns our data in html
    return(
        <h1>{data.name} {data.age}</h1>
    );
}

export default GetData;