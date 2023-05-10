import React, {useState , useEffect} from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import AddEmployeeImage from "../images/addEmployee.png";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import "../styles.css";
import Header from "./Header";
import Footer from './Footer';



export default function AddEmployee(){
  
  const ID = `emp${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
  const [name, setName]= useState("");
  const [filepath, setFilepath]= useState("");
  const[contact, setContact]= useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const[designation, setDesignation]=useState("");
  const[join,setJoin]= useState(getCurrentDate());
  const [errors,setError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  useEffect(() => {
    setJoin(getCurrentDate()); // Update the current date each time the component is rendered
  }, []);
  

  const handlePhoneChange = (e) => {
    setContact
    (e.target.value);

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(e.target.value)) {
      setPhoneError("Invalid phone number");
      document.getElementById("phone-error").style.color = "red";
    } else {
      setPhoneError("");
      document.getElementById("phone-error").style.color = "inherit";
    }
  };
 
 

  function handleImage(e) {
    console.log(e.target.files);
    setFilepath(e.target.files[0])

   

  }
  

   function sendData(e){
    e.preventDefault();

    if(ID.length===0 || name.length===0 || contact.length===0 || designation.length===0 || join.length===0 || filepath.length===0){
      setError(true);
  }
  else{
        const formData = {
          ID,
          name,
          filepath,
          contact,
          designation,
          join
      }
    }

    const formData = new FormData();


    formData.append('ID', ID);
    formData.append('name', name);
    formData.append('filepath', filepath);
    formData.append('contact', contact);
    formData.append('designation', designation);
    formData.append('join', join);


    axios.post("http://localhost:8070/employees/add", formData).then(()=>{
      
      //alert("Employee Added")
      toast.success("Employee Added Successfully!",{theme:'colored'});
      window.location = "/addemployee";
      
    }).catch((err)=>{
      toast.error(err);
    })
  }


    return(
      <div>
        <Header/>
         <div 
        
        style= {{
          
          backgroundImage: `url("../images/finance-background.jpg")`,
        //backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        backgroundSize: 'cover',
        //background-size: cover;
        backgroundPosition: 'center',
        maxWidth: '100%',
        opacity: '500'


      }}>
      
      
        <div className= "container" style={{display:"flex"}}>
        <ToastContainer></ToastContainer>
          <div className="addEmployeeImg"> <img src={AddEmployeeImage} alt="addEmployeeImage" style={{height:'300px' , width:'400px', marginTop:'10px'}}></img>
          </div>

          &nbsp;&nbsp;&nbsp;&nbsp;

          <div className="addEmployeeForm" style={{
                    boxShadow: "0 0 10px 0 white",
                    padding: "20px",
                    borderRadius: "10px",
                    backgroundColor: "#F5F5F5",
                    outline: "2px solid blue"
                }}>
          <h1 style={{color:"#00BFFF"}}>Add New Employee</h1>
        <form onSubmit={sendData}>
           <div class="form-group">
    <label for="name">Employee ID :</label>
    <input type="text" className="form-control" style={{width:"500px"}} id="id" value={ID}  aria-describedby="emailHelp" placeholder="Enter Employee Name"
    />

          {errors&&ID.length<=0?<label className="validation-label">ID cannot be empty</label>:""}
  </div>
        <div className="form-group"><br></br>
        <label for="name">Employee Name :</label>
        <input type="text" class="form-control" id="name" value={name} placeholder="Enter Employee Name"
           onChange={(e)=>{

     setName(e.target.value);
}}/>

{errors&&name.length<=0?<label className="validation-label">Name cannot be empty</label>:""}
  </div>

  <div class="col-9"><br></br>
            <label for="file" className="form-label">Upload Image :</label>
            <input type="file" name="filepath" accept=".png, .jpg, .jpeg" className="form-control" id="filepath" placeholder="Upload image"
              onChange={
                handleImage

              } />
             {errors&&filepath.length<=0?<label className="validation-label">Image cannot be empty</label>:""}

          </div>

          <div className="form-group"><br></br>
  <label for="name"> Contact No  :</label>
  <input
        type="tel"
        id="contact"
        name="contact"
        value={contact}
        onChange={handlePhoneChange}
      />
      <br></br>
      <span id="phone-error">{phoneError}</span>
      <br></br>
         {errors&&contact.length<=0?<label className="validation-label">Contact Number cannot be empty</label>:""}
  </div>  

  <div className="form-group">
  <div className="form-group">
  <label htmlFor="designation">Designation:</label>
  <select className="form-control" id="designation" value={designation} onChange={(e) => setDesignation(e.target.value)}>
    <option value="">Select Designation</option>
    <option value="Chef">Chef</option>
    <option value="Waiter">Waiter</option>
    <option value="Reseptionist">Receptionist</option>
    <option value="Cleaner">Cleaner</option>
    <option value="Driver">Driver</option>
  </select>
  {errors && designation.length <= 0 ? <label className="validation-label">Designation cannot be empty</label> : ""}
</div>
  </div>
  <br></br>
  <div class="form-group">
                        <label for="inputPaymentDate">Join Date : </label>
        <input type="date" id="join" name="join" value={join} max={join}  min={join} onChange={(event) => setJoin(event.target.value)} required />
                        {errors&&join.length<=0?<label className="validation-label">Join Date cannot be empty</label>:""}
                    </div>

 
 
 <br></br>
 <button type="submit" class="btn-add btn btn-success" style={{background: 'linear-gradient(#F7971E,#FFD200)',width:'80px'}}>Add</button>
                    &nbsp;&nbsp;
                    <Link className ="btn-back btn btn-primary" style={{background: 'linear-gradient(royalblue,tomato)',width:'80px'}} to={"/viewemployee"}>
                    <i class="fa-solid fa-backward"></i>&nbsp;Back
                    </Link>
</form>
   </div>
   </div>
  </div>
      <Footer/>
      </div>
     
   
    )
}


