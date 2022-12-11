import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/searchresult",{ state: { data: searchInput}})
    };


    return(
        <form 
        onSubmit={handleSubmit}
        onChange={handleChange}
        >
        <label htmlFor="header-search">
            <span className="visually-hidden">Search news</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Search news"
            name="s" 
        />
        <button type="submit">Search</button>
        </form>
    )
}


export default SearchBar;