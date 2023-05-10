import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import loginImage from "../images/login-back.png";
import fbicon from "../images/fb-image.png";
import googleicon from "../images/google-image.png";
import instaicon from "../images/insta-image.png";
import '../login.css';
import '../styles.modules.css'

function Login(){
    const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	}

    const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8070/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/home";
		} catch (error) {
			if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            } else {
                setError(error.response.data);
            }
		}
	};

    return(
        <div className="loginpage">
            <section>
                <div className="imgBx">
                    <img src={loginImage} alt="LoginBackImg"></img>
                </div>
                <div className="contentBx">
                    <div className="formBx">
                        <h2 className="login-title">Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="inputBx">
                                <span>Email</span>
                                <input className="login-input" type="email" name="email" placeholder="Enter email"
                                onChange={handleChange} value={data.email} required></input>
                            </div>
                            <div className="inputBx">
                                <span>Password</span>
                                <input className="login-input" type="password" name="password" placeholder="Enter password"
                                onChange={handleChange} value={data.password} required></input>
                            </div>
                            <div className="remember">
                                <label><input className="login-input" type="checkbox" name=""></input>Remember Me</label>
                            </div>
                            {error && <div className="error_msg">{error}</div>}
						    <button type="submit" className="orange_btn">
							Sign In
						    </button>
                            <div className="inputBx">
                                <p className="remember-para">Don't have an account?<Link to={"/register"}>Sign Up</Link></p>
                            </div>
                            
						    
                        </form>
                        <h3 className="login-social">Login with social media</h3>
                        <ul className="sci">
                            <li className="">
                                <img src={fbicon} width="40" height="38"></img>
                            </li>
                            <li className="">
                                <img src={googleicon} width="40" height="38"></img>
                            </li>
                            <li className="">
                                <img src={instaicon} width="40" height="38"></img>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login;