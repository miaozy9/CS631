import React, {useState, useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Return = () => {
    const [ResNumber, setResNumber] = useState("");
    const [Copy_DocId, setCopy_DocId] = useState("");
    const [CopyNo, setCopyNo] = useState("");
    const navigate = useNavigate();

    const onSubmit = async e => {
        e.preventDefault();
        const checkoutInfo = {
            ResNumber,
            Copy_DocId,
            CopyNo
        }
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const body = JSON.stringify(checkoutInfo);
        try {
            const res = await axios.post('http://localhost:8080/reserve', body, config);
            alert("Reserve success")
            navigate("/dashboard");
            }
            catch (error) {
                alert("Reserve failed")
            }
    }

    return (
        <section className="container"> 
            <h1  className="large text-primary">Document checkout</h1>
            <p className="lead"> Enter all required fields</p>

            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <input type="text" placeholder="ResNumber" name="ResNumber"
                        onChange={(e) => {
                            setResNumber(e.target.value);
                        }}
                    />
                    <input type="text" placeholder="Copy_DocId" name="Copy_DocId"
                        onChange={(e) => {
                            setCopy_DocId(e.target.value);
                        }}
                    />
                    <input type="text" placeholder="CopyNo" name="CopyNo"
                        onChange={(e) => {
                            setCopyNo(e.target.value);
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

export default Return