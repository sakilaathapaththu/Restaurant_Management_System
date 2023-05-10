import React,{ useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import customer from '../images/customer.jpg';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
//import '../styles.css';
import Header from "./Header";
import Footer from './Footer';

export default function AddCustomer(){
    const [RegNo,setRegNo] = useState("");
    const [Name,setName] = useState("");
    const [Email,setEmail] = useState("");
    const [Address,setAddress] = useState("");
    const [Phone,setPhone] = useState("");
    const [errors,setError] = useState("");

    function sendData(e){
        e.preventDefault(); 

        let regNoRegex = /^[A-Za-z0-9]+$/;
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let phoneRegex = /^[0-9]+$/;

        if(RegNo.length === 0 || !regNoRegex.test(RegNo)){
            setError("Please enter a valid registration number");
        }else if(Name.length === 0){
            setError("Please enter customer name");
        }else if(Email.length === 0 || !emailRegex.test(Email)){
            setError("Please enter a valid email address");
        }else if(Address.length === 0){
            setError("Please enter customer address");
        }else if(Phone.length === 0 || !phoneRegex.test(Phone)){
            setError("Please enter a valid phone number");
        }
        else{
            const newCustomer = {
                RegNo,
                Name,
                Email,
                Address,
                Phone
            }
    
            axios.post("http://localhost:8070/customers/add",newCustomer).then(() => {
                //console.log("New Customer Added Successfully!");
                toast.success("Customer Added Successfully!",{theme:'colored'});
                setRegNo("");
                setName("");
                setEmail("");
                setAddress("");
                setPhone("");
                setError("");
            }).catch((error) => {
                toast.error(error);
            })

        }
    }

    return(
       <div>
        <Header/>
        <div className="container" style={{display:"flex"}}>
            <ToastContainer></ToastContainer>
            <div className="addCustomerImg">
            <img src={customer} alt="CustomerImage" style={{height:'380px' , width:'600px', marginTop:'50px'}}></img>
            </div>

            &nbsp;&nbsp;&nbsp;&nbsp;

            <div className="addCustomerForm">
                <h1 style={{color:"#00BFFF"}}>Add New Customer</h1>
                <form onSubmit={sendData}>
                    <div class="form-group">
                        <label for="inputRegNo">RegNo : </label>
                        <input type="text" class="form-control" style={{width:"500px"}} id="invoiceID" value={RegNo} aria-describedby="emailHelp" placeholder="Enter RegNo"
                        onChange={(e) => {
                            setRegNo(e.target.value)
                        } } />
                        {errors&&RegNo.length<=0?<label className="validation-label">RegNo cannot be empty</label>:""}
                    </div>
                    <div class="form-group">
                        <label for="inputName">Name : </label>
                        <input type="text" class="form-control" id="name" value={Name} placeholder="Enter customer Name" required
                        onChange={(e) => {
                            setName(e.target.value);
                        } }/>
                        {errors&&Name.length<=0?<label className="validation-label">Name cannot be empty</label>:""}
                    </div>
                    <div class="form-group">
                        <label for="email">Email : </label>
                        <input type="text" class="form-control" id="email" value={Email} placeholder="Enter Email" required
                        onChange={(e) => {
                            setEmail(e.target.value);
                        } }/>
                        {errors&&Email.length<=0?<label className="validation-label">Email cannot be empty</label>:""}
                    </div>
                    <div class="form-group">
                        <label for="inputAddress">Address : </label>
                        <input type="text" class="form-control" id="address" value={Address} placeholder="Enter Address" required
                        onChange={(e) => {
                            setAddress(e.target.value);
                        } }/>
                        {errors&&Address.length<=0?<label className="validation-label">Address cannot be empty</label>:""}
                    </div>
                    <div class="form-group">
                        <label for="inputPhone">Phone : </label>
                        <input type="text" class="form-control" id="phone" value={Phone} placeholder="Enter Phone" required
                        onChange={(e) => {
                            setPhone(e.target.value);
                        } }/>
                        {errors&&Phone.length<=0?<label className="validation-label">Phone cannot be empty</label>:""}
                    </div>
                    
                    <br/>
                    <button type="submit" class="btn-add btn btn-success" style={{background: 'linear-gradient(#F7971E,#FFD200)',width:'80px'}}>Add</button>
                    &nbsp;&nbsp;
                    <a className ="btn-back btn btn-primary" style={{background: 'linear-gradient(royalblue,tomato)',width:'80px'}} href="/viewcustomers">
                    <i class="fa-solid fa-backward"></i>&nbsp;Back
                    </a>
                </form>
            </div>   
        </div>
        <Footer/>
       </div>
    )
}