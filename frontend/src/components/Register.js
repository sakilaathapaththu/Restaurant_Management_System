import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles.modules.css";

function Register(){
    const [data,setData] = useState({
        firstName:"",
        lastName:"",
        address:"",
        contactNo:"",
        email:"",
        password:""
    })
    const [error,setError] = useState("")

    const navigate = useNavigate();

    const handleChange = ({ currentTarget:input }) => {
        setData({...data,[input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const url = "http://localhost:8070/api/users";
            const { data:res } = await axios.post(url,data);
            navigate("/")
            console.log(res.message);
        }catch(error){
            if(error.response && error.response.status >= 400 && error.response.status <= 500){
                setError(error.response.data.message)
            }

        }
    }

    return(
        <div className="signup_container">
            <div className="signup_form_container">
                <div className="left">
                    <h1>Welcome Back</h1>
                    <Link to="/">
                        <button type="button" className="white_btn">
                            Sign In
                        </button>
                    </Link>
                </div>
                <div className="right">
                    <form className="from_container" onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <input type="text" name="firstName" placeholder="First Name" value={data.firstName} className="input" required
                        onChange={handleChange}/>
                        <input type="text" name="lastName" placeholder="Last Name" value={data.lastName} className="input" required
                        onChange={handleChange}/>
                        <input type="text" name="address" placeholder="Address" value={data.address} className="input" required
                        onChange={handleChange}/>
                        <input type="text" name="contactNo" placeholder="Contact No" value={data.contactNo} className="input" required
                        onChange={handleChange}/>
                        <input type="email" name="email" placeholder="Email" value={data.email} className="input" required
                        onChange={handleChange}/>
                        <input type="password" name="password" placeholder="Password" value={data.password} className="input" required
                        onChange={handleChange}/>

                        {error && <div className="error_msg">{error}</div>}
                        <button type="submit" className="green_btn">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;