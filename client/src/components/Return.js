import React, {useState, useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Return = () => {
    const [BorNumber, setBorNumber] = useState("");
    const [DocId, setDocId] = useState("");
    const [CopyNo, setCopyNo] = useState("");
    const [BId, setBId] = useState("");
    const [ReaderId, setReaderId] = useState("");
    const navigate = useNavigate();

    const onSubmit = async e => {
        e.preventDefault();
        const checkoutInfo = {
            BorNumber,
            DocId,
            CopyNo,
            BId,
            ReaderId
        }
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const body = JSON.stringify(checkoutInfo);
        try {
            const res = await axios.post('http://localhost:8080/return', body, config);
            alert("Return success")
            navigate("/dashboard");
            }
            catch (error) {
                alert("Wrong entries")
            }
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
                    <input type="text" placeholder="docid" name="docid"
                        onChange={(e) => {
                            setDocId(e.target.value);
                        }}
                    />
                    <input type="text" placeholder="CopyNo" name="CopyNo"
                        onChange={(e) => {
                            setCopyNo(e.target.value);
                        }}
                    />
                    <input type="text" placeholder="BId" name="BId"
                        onChange={(e) => {
                            setBId(e.target.value);
                        }}
                    />
                    <input type="text" placeholder="ReaderId" name="ReaderId"
                        onChange={(e) => {
                            setReaderId(e.target.value);
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