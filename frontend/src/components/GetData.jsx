import React, {useState, useEffect} from "react";

function GetData(){
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(process.env.REACT_APP_PROXY + "/")
        .then(res => res.json())
        .then(data => setData(data))
    }, [])

    return(
        <h1>{data.name} {data.age}</h1>
    );
}

export default GetData;