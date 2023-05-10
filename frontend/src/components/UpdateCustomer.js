import React,{ useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import updatecus from "../images/updatecus.png";
import Header from "./Header";
import Footer from './Footer';

export default function UpdateCustomer(){
    const { id } = useParams();

    const [customer,setCustomer] = useState([]);
    const [RegNo,setRegNo] = useState("");
    const [Name,setName] = useState("");
    const [Email,setEmail] = useState("");
    const [Address,setAddress] = useState("");
    const [Phone,setPhone] = useState("");
    const [errors,setError] = useState(false);

    useEffect(() => {
        function getCustomer(){
            axios.get("http://localhost:8070/customers/get/" + id).then((res) => {
                console.log(res.data);
                setCustomer(res.data);
                setRegNo(res.data.RegNo)
                setName(res.data.Name)
                setEmail(res.data.Email)
                setAddress(res.data.Address)
                setPhone(res.data.Phone)
            }).catch((error) => {
                alert(error.message);
            })
        }
        getCustomer();
    }, [id])

    function handle(e){
        e.preventDefault();

        if(RegNo.length===0 || Name.length===0 || Email.length===0 || Address.length===0 || Phone.length===0){
            setError(true);
        }
        else{
            const UpdateCustomer = {
                RegNo,
                Name,
                Email,
                Address,
                Phone
            }
    
            console.log(UpdateCustomer)
    
            axios.put("http://localhost:8070/customers/update/" + id, UpdateCustomer).then(function(){
                toast.success("Customer Updated Sucessfully!",{theme:'colored'});
                setRegNo("");
                setName("");
                setEmail("");
                setAddress("");
                setPhone("");
                setError(false);
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
            <div className="updateCustomerImg">
            <img src={updatecus} alt="CustomerImage" style={{height:'400px' , width:'600px', marginTop:'50px'}}></img>
            </div>

            &nbsp;&nbsp;&nbsp;&nbsp;

            <div className="updateCustomerForm">
            <h1 style={{color:"#00BFFF"}}>Edit Customer</h1>
            <form onSubmit={handle}>
                <div class="form-group">
                    <label for="inputRegNo">RegNo : </label>
                    <input type="text" class="form-control" style={{width:"500px"}} id="RegNo" aria-describedby="emailHelp" value={RegNo} placeholder="Enter RegNo"
                    onChange={(e) => {
                        setRegNo(e.target.value);
                    } } />
                    {errors&&RegNo.length<=0?<label className="validation-label">RegNo cannot be empty</label>:""}
                </div>
                <div className="form-group">
                    <label for="inputName">Name : </label>
                    <input type="text" class="form-control" id="Name" value={Name} placeholder="Enter Name"
                    onChange={(e) => {
                        setName(e.target.value);
                    } }/>
                    {errors&&Name.length<=0?<label className="validation-label">Name cannot be empty</label>:""}
                </div>
                <div className="form-group">
                    <label for="inputEmail">Email : </label>
                    <input type="text" class="form-control" id="Email" value={Email} placeholder="Enter Email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    } }/>
                    {errors&&Email.length<=0?<label className="validation-label">Email cannot be empty</label>:""}
                </div>
                <div className="form-group">
                    <label for="inputAddress">Address : </label>
                    <input type="text" class="form-control" id="Address" value={Address} placeholder="Enter Address"
                    onChange={(e) => {
                        setAddress(e.target.value);
                    } }/>
                    {errors&&Address.length<=0?<label className="validation-label">Address cannot be empty</label>:""}
                </div>
                <div className="form-group">
                    <label for="inputPhone">Phone : </label>
                    <input type="number" class="form-control" id="Phone" value={Phone} placeholder="Enter Phone"
                    onChange={(e) => {
                        setPhone(e.target.value);
                    } }/>
                    {errors&&Phone.length<=0?<label className="validation-label">Phone cannot be empty</label>:""}
                </div>
                
                <br/>
                <button type="submit" class="btn-update btn btn-primary" style={{background: 'linear-gradient(#F7971E,#FFD200)',width:'100px'}}>Update</button>
                &nbsp;&nbsp;
                <Link className ="btn-back btn btn-primary" style={{background: 'linear-gradient(royalblue,tomato)',width:'80px'}} to={"/viewcustomers"}>
                <i class="fa-solid fa-backward"></i>&nbsp;Back
                </Link>
            </form>
            </div>
        </div>
        <Footer/>
       </div>
    )
}