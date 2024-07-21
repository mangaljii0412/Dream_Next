import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../redux/state";
import "../styles/Login.scss";
const Loginpage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`,{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({email,password})
            })
            // Get data after fetching
            const loggedIn = await response.json();
            if(loggedIn) {
                dispatch(
                    setLogin({
                        user:loggedIn.user,
                        token: loggedIn.token
                    })
                )
                navigate("/");
            }

        }
        catch(err){
            console.log("Login failed", err.message);
        }
    }
    return (
        <div className="login">
            <div className="login_content">
                <form className="login_content_form" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" value={email} onChange={ (e) => setEmail( e.target.value )} required></input>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={ (e) => setPassword( e.target.value )}
                        required
                    ></input>
                    <button type="submit">Login</button>
                    <a href="/register">Don't have an account? SignIn Here</a>
                </form>
            </div>
        </div>
    );
};

export default Loginpage;
