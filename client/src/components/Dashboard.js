import React, {useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../Context/GlobalState';
import { Link } from 'react-router-dom';
import axios from "axios";
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';

// TODO //
// search document status
// 


const Dashboard = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    // Input field Views
    const [addDocV, setAddDocV] = useState(false);
    const [searchDocV, setSearchDocV] = useState(false);
    const [newReader, setNewReader] = useState(false);
    const [branchV, setBranchV] = useState(false);
    const [branchBorrower, setBranchBorrower] = useState(false);
    const [libBorrower, setLibBorrower] = useState(false);
    const [branchBor, setBranchBor] = useState(false);
    const [libBor, setLibBor] = useState(false);
    const [popularBooks, setPopularBooks] = useState(false);
    const [avgFine, setAvgFine] = useState(false);

    // Input Fields
    // // Doc Fields
    const [title, setTitle] = useState("");
    const [docID, setDocID] = useState("");
    const [date, setDate] = useState();
    const [pubID, setPubID] = useState("");
    const [branchID, setBranchID] = useState("");
    // // Reader Fields
    const [readerID, setReaderID] = useState("");
    const [type, setType] = useState("student");
    const [readerName, setReaderName] = useState("");
    const [numBorrow, setNumBorrow] = useState("");
    const [numReserved, setNumReserved] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [address, setAddress] = useState("");

    let { userProfile } = useContext(GlobalContext);
    let isAdmin = userProfile[0]['isAdmin'] ? userProfile[0]['isAdmin'] : false;

    useEffect(async () => {
      // console.log(userProfile)
      // const url = `http://localhost:8080/news/${userProfile[0].username}`
      //   const res = await axios.get(url).catch((error) => console.log(error));
      //   setPosts(res.data.articles)
    }, []);

    const onAddDocSubmit = async e => {
      e.preventDefault();
      try {
        const data = {docID: docID, title: title, pDate: date, pubID: pubID}
        const res = await axios.post('http://localhost:8080/addDoc', data);
        if (res.data == "1062") alert("DocID already exists!");
        else if (res.data == "1063") alert("Something went wrong! Try again!")
        else alert("Document Added Successfully!");

        // Clearing Fields
        setTitle("")
        setDocID("")
        pubID("")
      } catch (error) {
          console.log("onAddDocError: ", error);
      }
      return false;
    }

    const onAddReaderSubmit = async e => {
      e.preventDefault();
      try {
        const data = {
          ReaderId: readerID, 
          Type: type, 
          ReadName: readerName, 
          NumBorBooks: numBorrow,
          NumResBooks: numReserved,
          PhoneNo: phoneNo,
          Address: address
        }
        const res = await axios.post('http://localhost:8080/addReader', data);
        if (res.data == "1062") alert("ReaderID already exists!");
        else if (res.data == "1063") alert("Something went wrong! Try again!")
        else alert("Reader Added Successfully!");

        // Clearing Fields
        setReaderID("")
        setReaderName("")
        setNumBorrow("")
        setNumReserved("")
        setPhoneNo("")
        setAddress("")
      } catch (error) {
          console.log("onAddReaderError: ", error);
      }
      return false;
    }

    if (isAdmin) return (
      <div>
        <a href="#" onClick={() => setAddDocV(!addDocV)}>Add a document</a>
        {addDocV ? addDocView() : <div></div>}
        <a href="#" onClick={() => setSearchDocV(!searchDocV)}>Search a document</a>
        {searchDocV ? searchDocView() : <div></div>}
        <a href="#" onClick={() => setNewReader(!newReader)}>Add New Reader</a>
        {newReader ? newReaderView() : <div></div>}
        <a href="#" onClick={() => setBranchV(!branchV)}>Print Branch Information</a>
        {branchV ? branchView() : <div></div>}
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
        <br></br>
        <Link to="/Checkout"> Checkout</Link>
        <br></br>
        <Link to="/Return"> Return</Link>
        <br></br>
        <Link to="/Reserve"> Reserve Document</Link>
        <br></br>
        <Link to="/Fine">Compute Fine</Link>
        <br></br>
        <Link to="/DocList">Print Borrowed Document List</Link>
        <br></br>
        <Link to="/searchDoc">Print Document by a Publisher</Link>
        <br></br>
        <Link to="/"> Quit</Link>
      </div>
    )

    function addDocView() {
      return (
        <form className="form" onSubmit={e => onAddDocSubmit(e)} action="#">
             <div className="form-group">
                 <input data-testid="docID1" type="text" placeholder="Doc ID" name="docID" value={docID}
                    onChange={(e) => {
                      setDocID(e.target.value);
                    }}
                />
            </div>
            <div className="form-group">
                <input data-testid="title1" type="text" placeholder="Title" name="title" value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
            </div>
            <div className="form-group">
            <input type="date" id="pDate" name="pDate"
                value={date} onChange={(e) => setDate(e.target.value)}/>
            </div>
            <div className="form-group">
                <input data-testid="publisherID1" type="text" placeholder="Publisher ID" name="publisherID" value={pubID}
                    onChange={(e) => {
                        setPubID(e.target.value);
                    }}
                />
            </div>
            <input data-testid="submitD1" type="submit" className="btn btn-primary" value="Submit" />
        </form>
      );
    }

    function searchDocView() {
      return (
        <form className="form" onSubmit={e => navigate("/adminSearchResult", { state: { data: `id: ${docID}`}})}>
             <div className="form-group">
                 <input data-testid="docID2" type="number" placeholder="Doc ID" name="docID"
                    onChange={(e) => {
                        setDocID(e.target.value);
                    }}
                />
            </div>
            <input data-testid="submitD2" type="submit" className="btn btn-primary" value="Submit" />
        </form>
      );
    }

    function newReaderView() {
      return (
        <form className="form" onSubmit={e => onAddReaderSubmit(e)}>
              <div className="form-group">
                  <input data-testid="readerID1" type="text" placeholder="Reader ID" name="readerID" value={readerID}
                    onChange={(e) => {
                      setReaderID(e.target.value);
                    }}
                />
            </div>
            <div className="form-group">
              <select name="Type" id="type" onChange={(e) => {
                console.log(e.target.value)
                setType(e.target.value)
              }}>
                <option value="student">Student</option>
                <option value="staff">Staff</option>
                <option value="senior">Senior</option>
                <option value="reader">Reader</option>
                <option value="publisher">Publisher</option>
              </select>
            </div>
            <div className="form-group">
                <input data-testid="readerName1" type="text" placeholder="Reader Name" name="readerName" value={readerName}
                    onChange={(e) => {
                        setReaderName(e.target.value);
                    }}
                />
            </div>
            <div className="form-group">
                <input data-testid="numBorBooks1" type="number" placeholder="No. of Books Borrowed" name="numBorrow" value={numBorrow}
                    onChange={(e) => {
                        setNumBorrow(e.target.value);
                    }}
                />
            </div>
            <div className="form-group">
                <input data-testid="numReserved1" type="number" placeholder="No. of Books Reserved" name="numReserved" value={numReserved}
                    onChange={(e) => {
                        setNumReserved(e.target.value);
                    }}
                />
            </div>
            <div className="form-group">
                <input data-testid="phoneNo1" type="number" maxlength="10" placeholder="Phone Number" name="phoneNo" value={phoneNo}
                    onChange={(e) => {
                        setPhoneNo(e.target.value);
                    }}
                />
            </div>
            <div className="form-group">
                <input data-testid="address1" type="text" placeholder="Address" name="address" value={address}
                    onChange={(e) => {
                        setAddress(e.target.value);
                    }}
                />
            </div>
            <input data-testid="submitD3" type="submit" className="btn btn-primary" value="Submit" />
        </form>
      );
    }

    function branchView() {
      return (
        <form className="form" onSubmit={e => navigate("/adminSearchResult", { state: { data: `bid: ${branchID}`}})}>
             <div className="form-group">
                 <input data-testid="branchID" type="number" placeholder="Branch ID" name="branchID"
                    onChange={(e) => {
                        setBranchID(e.target.value);
                    }}
                />
            </div>
            <input data-testid="submitD4" type="submit" className="btn btn-primary" value="Submit" />
        </form>
      );
    }

}

export default Dashboard