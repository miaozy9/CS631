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
        console.log("data", data)
        let url;
        let res;
        if (typeof data == 'object') {
            if (data.mode > 1) {
                url = data.url
                res = await axios.post('http://localhost:8080/getLibraryBooks', data);
                console.log(data)
            } else {
                url = data.url
                res = await axios.post('http://localhost:8080/getBorrowedBooks', data);
                console.log(data)
            }
        } else {
            url = `http://localhost:8080/search/${data}`
            res = await axios.get(url)
        }
        if (res.data.length > 0) setDoc(JSON.stringify(res.data))
        else {
            alert(`No record found!`)
            navigate(-1);
        }
        console.log("res", res)
        });


    return (
        <div>
            <div>
                <p>{doc}</p>
            </div>
        </div>
    )
}

export default AdminSearchResult