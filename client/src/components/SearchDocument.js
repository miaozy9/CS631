import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const SearchDoc = () => {
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
        <div>
            <form 
            onSubmit={handleSubmit}
            onChange={handleChange}
            >
                <label htmlFor="header-search">
                    <span className="visually-hidden">Search</span>
                </label>
                <input
                    type="text"
                    id="header-search"
                    placeholder="eg: id: 123456"
                    name="s" 
                />
                <button type="submit">Search</button>
            </form>
        </div>

        
    )
}


export default SearchDoc;