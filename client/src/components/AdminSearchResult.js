import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';


const AdminSearchResult = () => {
    const navigate = useNavigate();
    const [doc, setDoc] = useState([]);
    const [message, setMessage] = useState([]);

    let location = useLocation();
    const { data } = location.state;

    useEffect(async () => {
        const url = `http://localhost:8080/search/${data}`
        axios.get(url).then(res => {
        if (res.data.length > 0) setDoc(JSON.stringify(res.data))
        else {
            alert(`No record found with ${data}`)
            navigate(-1);
        }
        console.log("res", res)
        })
    }, []);


    return (
        <div>
            <div>
                <p>{doc}</p>
            </div>
        </div>
    )
}

export default AdminSearchResult