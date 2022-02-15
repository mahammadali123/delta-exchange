import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showError, setShowError] = useState(false)
    const navigate=useNavigate();

    const handleSignup = (event) => {
        event.preventDefault()
        if (password != confirmPassword) {
            setShowError(true);
        }
        else {
            const params = {
                 userName, password 
            }
            axios.get('/api/v1/users/new', { params })
                .then(res => {
                    if(res.data.status === 200){
                        navigate(`/home/${userName}`)
                    }
                })
        }
    }

    return <div>
        <div className="box">
            <h1>SignUp</h1>
            {showError && <span className="error">Password and Confirm Password Should be Same</span>}
            <form>
                <input onChange={event => setUsername(event.target.value)} type={'text'} value={userName} name="username" id="username" placeholder="User Name" required />
                <input onChange={event => setPassword(event.target.value)} type={'password'} value={password} name="password" id="password" placeholder="Password" required />
                <input onChange={event => setConfirmPassword(event.target.value)} type={'password'} value={confirmPassword} name="confirm-password" id="confirm-password" placeholder="Confirm Password" required />
                <button className="btn" onClick={handleSignup}>SignUp</button>
            </form>
        </div>
    </div>
}