import React,{ useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import updateEmployeeImage from "../images/updateEmployee.png";
import Header from "./Header";
import Footer from './Footer';

export default function UpdateEmployee(){
    const { id } = useParams();

    const [employee,setEmployee] = useState([]);
    const [ID,setId] = useState("");
    const [name,setName] = useState("");
    const [filepath,setFilepath] = useState("");
    const [contact,setContact] = useState("");
    const [designation,setDesignation] = useState("");
    const [join,setJoin] = useState("");
    const [errors,setError] = useState("");

    useEffect(() => {
        function getEmployee(){
            axios.get("http://localhost:8070/employees/get/" + id).then((res) => {
                console.log(res.data);
                setEmployee(res.data);
                setId(res.data.ID)
                setName(res.data.name)
                setFilepath(res.data.filepath)
                setContact(res.data.contact)
                setDesignation(res.data.designation)
                setJoin(res.data.join)
            }).catch((error) => {
                alert(error.message);
            })
        }
        getEmployee();
    }, [id])

    function handle(e){
        e.preventDefault();

        if(ID.length===0 || name.length===0 || filepath.length===0 ||contact.length===0 || designation.length===0 || join.length===0){
            setError(true);
        }
        else{
            const UpdateEmployee = {
                ID,
                name,
                filepath,
                contact,
                designation,
                join
            }
    
            console.log(UpdateEmployee)
    
            axios.put("http://localhost:8070/employees/update/" + id, UpdateEmployee).then(function(){
                toast.success("Employee Updated Sucessfully!",{theme:'colored'});
                setId("");
                setName("");
                setFilepath("");
                setContact("");
                setDesignation("");
                setJoin("");
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
            <div className="updateEmployeeImg">
            <img src={updateEmployeeImage} alt="EmployeeImage" style={{height:'400px' , width:'600px', marginTop:'50px'}}></img>
            </div>


            &nbsp;&nbsp;&nbsp;&nbsp;

            <div className="updateEmployeeForm" style={{
                    boxShadow: "0 0 10px 0 white",
                    padding: "20px",
                    borderRadius: "10px",
                    backgroundColor: "#F5F5F5",
                    outline: "2px solid blue"
                }}>
            <h1 style={{color:"#00BFFF"}}>Edit Employee</h1>
            <form onSubmit={handle}>
                <div class="form-group">
                    <label for="inputEmployeeID">EmployeeID : </label>
                    <input type="text" class="form-control" style={{width:"500px"}} id="ID" aria-describedby="emailHelp" value={ID} placeholder={`Enter ID (${ID})`}
                    onChange={(e) => {
                        setId(e.target.value);
                    } } />
                    {errors&&ID.length<=0?<label className="validation-label">EmployeeID cannot be empty</label>:""}
                </div>
                <div class="form-group">
                    <label for="inputEmployeeName">EmployeeName : </label>
                    <input type="text" class="form-control" id="name" value={name} placeholder="Enter Employee Name"
                    onChange={(e) => {
                        setName(e.target.value);
                    } }/>
                    {errors&&name.length<=0?<label className="validation-label">EmployeeName cannot be empty</label>:""}
                </div>
                <div class="form-group">
                    <label for="inputFile">Upload Image : </label>
                    <input type="file" class="form-control" id="filepath"  placeholder="Upload Image"
                    onChange={(e) => {
                        setFilepath(e.target.value);
                    } }/>
                    {errors&&filepath.length<=0?<label className="validation-label">Image cannot be empty</label>:""}
                </div>
                <div class="form-group">
                    <label for="inputContact">ContactNumber : </label>
                    <input type="text" class="form-control" id="contact" value={contact} placeholder="Enter Contact Number"
                    onChange={(e) => {
                        setContact(e.target.value);
                    } }/>
                    {errors&&contact.length<=0?<label className="validation-label">Contact cannot be empty</label>:""}
                </div>
                <div class="form-group">
                    <label for="inputDesignation">Designation : </label>
                    <input type="text" class="form-control" id="designation" value={designation} placeholder="Enter Designation"
                    onChange={(e) => {
                        setDesignation(e.target.value);
                    } }/>
                    {errors&&designation.length<=0?<label className="validation-label">Designation cannot be empty</label>:""}
                </div>
                <div class="form-group">
                    <label for="inputJoinDate">JoinDate : </label>
                    <input type="date" class="form-control" id="join" value={join} placeholder="Enter Join Date(eg:2022-03-02)"
                    onChange={(e) => {
                        setJoin(e.target.value);
                    } }/>
                    {errors&&designation.length<=0?<label className="validation-label">JoinDate cannot be empty</label>:""}
                </div>
                
                <br/>
                <button type="submit" class="btn-update btn btn-primary" style={{background: 'linear-gradient(#F7971E,#FFD200)',width:'100px'}}>Update</button>
                &nbsp;&nbsp;
                <Link className ="btn-back btn btn-primary" style={{background: 'linear-gradient(royalblue,tomato)',width:'80px'}} to={"/viewemployee"}>
                <i class="fa-solid fa-backward"></i>&nbsp;Back
                </Link>
            </form>
            </div>
        </div>
        <Footer/>
        </div>
    )
}