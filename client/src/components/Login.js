import React, {useState, useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link} from 'react-router-dom';
import { GlobalContext } from '../Context/GlobalState';


const Login = () => {
    const [readerID, setReaderID] = useState("")
    const navigate = useNavigate();
    const {addUser} = useContext(GlobalContext);

    const onSubmit = async e => {
        e.preventDefault();
        const reader = {
            readerID
        }
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const body = JSON.stringify(reader);
        try {
            const res = await axios.post('http://localhost:8080/readerSignin', body, config);
            addUser(reader);
            navigate("/dashboard");

            }
            catch (error) {
                alert("Wrong username/password combination!")
                alert(error)
            }
        
       
    }

    return (
        <section className="container"> 
            <h1  className="large text-primary">Reader</h1>
            <p className="lead"> Enter your reader ID</p>

            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="readerID" name="username"
                        onChange={(e) => {
                            setReaderID(e.target.value);
                        }}
                    />
                </div>
                <input data-testid="loginEl" type="submit" className="btn btn-primary" value="Login" />
            </form>
            {/* <p className="my-1">
                Don't have an account? <Link data-testid="signUpEl" to="/register">Sign Up</Link>
            </p> */}
        </section>    
    );
}

export default Login