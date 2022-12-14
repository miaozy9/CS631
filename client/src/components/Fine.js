import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Fine = () => {
    const [BorNumber, setBorNumber] = useState("");
    const [fine, setFine] = useState("");

    const onSubmit = async e => {
        e.preventDefault();
        console.log(BorNumber)
        axios.get(`http://localhost:8080/fine/${BorNumber}`).then(res => {
            setFine(JSON.stringify(res.data))
          })
        alert(fine)
    }

    return (
        <section className="container"> 
            <h1  className="large text-primary">Document checkout</h1>
            <p className="lead"> Enter all required fields</p>

            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <input type="text" placeholder="BorNumber" name="BorNumber"
                        onChange={(e) => {
                            setBorNumber(e.target.value);
                        }}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="checkout" />
            </form>
            {/* <p className="my-1">
                Don't have an account? <Link data-testid="signUpEl" to="/register">Sign Up</Link>
            </p> */}
        </section>    
    );
}

export default Fine