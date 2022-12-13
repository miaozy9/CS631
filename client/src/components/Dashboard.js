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

    // Input fields
    const [addDocV, setAddDocV] = useState(false);
    const [searchDocV, setSearchDocV] = useState(false);
    const [newReader, setNewReader] = useState(false);
    const [branchInfo, setBranchInfo] = useState(false);
    const [branchBorrower, setBranchBorrower] = useState(false);
    const [libBorrower, setLibBorrower] = useState(false);
    const [branchBor, setBranchBor] = useState(false);
    const [libBor, setLibBor] = useState(false);
    const [popularBooks, setPopularBooks] = useState(false);
    const [avgFine, setAvgFine] = useState(false);

    let { userProfile } = useContext(GlobalContext);
    let isAdmin = userProfile[0]['isAdmin'] ? userProfile[0]['isAdmin'] : false;

    useEffect(async () => {
      // console.log(userProfile)
      // const url = `http://localhost:8080/news/${userProfile[0].username}`
      //   const res = await axios.get(url).catch((error) => console.log(error));
      //   setPosts(res.data.articles)
    }, []);

    const onSubmit = async e => {
      
    }

    if (isAdmin) return (
      <div>
        <a href="#" onClick={() => setAddDocV(!addDocV)}>Add a document</a>
        {addDocV ? addDocView() : <div></div>}
        <a href="#" onClick={() => setSearchDocV(!searchDocV)}>Search a document</a>
        {searchDocV ? newReaderView() : <div></div>}
        <a href="#" onClick={() => setNewReader(!newReader)}>Add New Reader</a>
        {newReader ? newReaderView() : <div></div>}
        <a href="#" onClick={() => setBranchInfo(!branchInfo)}>Print Branch Information</a>
        {branchInfo ? <h1>Hello</h1> : <div></div>}
        <a href="#" onClick={() => setBranchBorrower(!branchBorrower)}>Top N most frequent borrowers in Branch</a>
        {branchBorrower ? <h1>Hello</h1> : <div></div>}
        <a href="#" onClick={() => setLibBorrower(!libBorrower)}>Top N most frequent borrowers in Library</a>
        {libBorrower ? <h1>Hello</h1> : <div></div>}
        <a href="#" onClick={() => setBranchBor(!branchBor)}>N most borrowed books in Branch</a>
        {branchBor ? <h1>Hello</h1> : <div></div>}
        <a href="#" onClick={() => setLibBor(!libBor)}>N most borrowed books in Library</a>
        {libBor ? <h1>Hello</h1> : <div></div>}
        <a href="#" onClick={() => setPopularBooks(!popularBooks)}>10 most popular books in a year</a>
        {popularBooks ? <h1>Hello</h1> : <div></div>}
        <a href="#" onClick={() => setAvgFine(!avgFine)}>Average fine paid per branch</a>
        {avgFine ? <h1>Hello</h1> : <div></div>}
        <a href="#" onClick={() => {}}>Quit</a>
      </div>
    ); else return (
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

    function addDocView() {
      return (
        <form className="form" onSubmit={e => onSubmit(e)}>
             <div className="form-group">
                 <input data-testid="docID1" type="text" placeholder="Doc ID" name="docID"
                    onChange={(e) => {
                        // setUnLog(e.target.value);
                    }}
                />
            </div>
            <div className="form-group">
                <input data-testid="title1" type="text" placeholder="Title" name="title"
                    onChange={(e) => {
                        // setPdLog(e.target.value);
                    }}
                />
            </div>
            <h5>Will insert Date component here</h5>
            <div className="form-group">
                <input data-testid="publisherID1" type="text" placeholder="Publisher ID" name="publisherID"
                    onChange={(e) => {
                        // setPdLog(e.target.value);
                    }}
                />
            </div>
            <input data-testid="submitD1" type="submit" className="btn btn-primary" value="Submit" />
        </form>
      );
    }

    function searchDocView() {
      return (
        <div></div>
      );
    }

    function newReaderView() {
      // return (
      //   <form className="form" onSubmit={e => onSubmit(e)}>
      //       <div className="form-group">
      //           <input data-testid="usernameEl" type="text" placeholder="username" name="username"
      //               onChange={(e) => {
      //                   setUnLog(e.target.value);
      //               }}
      //           />
      //       </div>
      //       <div className="form-group">
      //           <input data-testid="passwordEl" type="password" placeholder="Password" name="password"
      //               onChange={(e) => {
      //                   setPdLog(e.target.value);
      //               }}
      //           />
      //       </div>
      //       <input data-testid="loginEl" type="submit" className="btn btn-primary" value="Login" />
      //   </form>
      // );
    }



}

export default Dashboard