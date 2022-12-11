import React, {useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../Context/GlobalState';
import NewsArticle from "./NewsArticle";
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import axios from "axios";
import SearchBar from './SearchBar';


const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    let { userProfile } = useContext(GlobalContext);

    useEffect(async () => {
        const url = `http://localhost:8080/news/${userProfile[0].username}`
          const res = await axios.get(url).catch((error) => console.log(error));
          setPosts(res.data.articles)
    }, []);

    return (
        <div>
          <h1>Reader Function Menu</h1>
          <Link to="/searchDoc"> Search Document</Link>
          <h2>Checkout Document</h2>
          <h2>Return Document</h2>
          <h2>Reserve Document</h2>
          <h2>Compute Fine</h2>
          <h2>Print Document List</h2>
          <h2>Print Document by a Publisher</h2>
          <h2>Quit</h2>
        </div>
    )
}

export default Dashboard