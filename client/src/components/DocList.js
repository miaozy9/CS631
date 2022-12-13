import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../Context/GlobalState';
import axios from "axios";
import { useLocation } from 'react-router-dom';


const DocList = () => {
  const [doc, setDocs] = useState([]);
  const { userProfile } = useContext(GlobalContext);
  
  let readerID = userProfile[0].readerID;

  useEffect(async () => {
    const url = `http://localhost:8080/doclist/${readerID}`
    axios.get(url).then(res => {
      setDocs(JSON.stringify(res.data))
    })
  }, []);


  return (
      <div>
          <div>
            <p>Document List:</p>
          </div>
          <div>
            <p>{doc}</p>
          </div>
      </div>
  )
}

export default DocList