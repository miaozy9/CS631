import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useLocation } from 'react-router-dom';


const SearchResult = () => {
  const [doc, setDocs] = useState([]);
  const [message, setMessage] = useState([]);

  let location = useLocation();
  const { data } = location.state;

  useEffect(async () => {
    const url = `http://localhost:8080/search/${data}`
    axios.get(url).then(res => {
      setDocs(JSON.stringify(res.data))
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

export default SearchResult