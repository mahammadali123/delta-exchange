import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false)
    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();
        if (userName.length != 0 && password.length != 0) {
            axios.post('api/v1/users', { user: { userName, password } }).then(res => {
                if (res.data.status === 200) {
                    navigate(`/home/${userName}`);
                }
                else if (res.data.status === 422) {
                    console.log('error')
                    setShowError(true)
                }
            })
        }
    }

    return <div className="root">
        <div className="box" >
            <h1>Login</h1>
            {showError && <p className="error">Couldn't find your account</p>}
            <form>
                <input onChange={(event) => setUserName(event.target.value)} type={"text"} placeholder="UserName" id="username" value={userName} required />
                <input onChange={(event) => setPassword(event.target.value)} type={"password"} placeholder="Password" id="password" value={password} required />
                <button className="btn" onClick={handleSubmit} >Login</button>
                <p>Don't Have Account <Link to={'/signup'} className="signup" >SignUp</Link></p>
            </form>
        </div>
    </div>
}