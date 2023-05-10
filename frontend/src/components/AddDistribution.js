import React, {useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../styles.css';
import Header from "./Header";
import Footer from './Footer';



export default function AddDistribution(){
const [errors, setError] = useState(null);

  
  const [Date, setDate]= useState("");
  const [Dambulla,setDambulla]= useState("");
  const [Matale, setMatale]= useState("");
  const [Kandy, setKandy]= useState("");
  const [total,setTotal]=useState("");
  const [vehicleId, setvehicleId]= useState("");
  const [drivername, setdrivername]= useState("");


  function sendData(e){
    e.preventDefault();

    if(Date.length===0 || Dambulla.length===0 || Matale.length===0 || Kandy.length===0 || vehicleId.length===0 || drivername.length===0){
      setError(true);
  }
  else{
      const newdistribution = {
        Date,
        Dambulla,
        Matale,
        Kandy,
        total,
        vehicleId,
        drivername
    }

    axios.post("http://localhost:8070/distributions/add", newdistribution).then(()=>{
      toast.success("Distribution Added Successfully!",{theme:'colored'});  
      setDate("");
      setDambulla("");
      setMatale("");
      setKandy("");
      setTotal("");
      setvehicleId("");
      setdrivername("");

      
    }).catch((err)=>{
      toast.error();
    })
  }
}
function handledabullaChange(e) {
  const Dambulla = e.target.value;
  const total = parseInt(Dambulla) + parseInt(Kandy) + parseInt(Matale);
  setDambulla(Dambulla);
  setTotal(total);
}

function handlekandyChange(e) {
  const Kandy = e.target.value;
  const total = parseInt(Dambulla) + parseInt(Kandy) + parseInt(Matale);
  setKandy(Kandy);
  setTotal(total);
}
function handlemathaleChange(e) {
  const Matale = e.target.value;
  const total = parseInt(Dambulla) + parseInt(Kandy) + parseInt(Matale);
  setMatale(Matale);
  setTotal(total);
}


return(

  <div>
    <Header/>
    <div className="addDistributionForm">
    <ToastContainer></ToastContainer>
  <h1 style={{color:"#00BFFF"}}>Add New Distribution</h1>
  <form onSubmit={sendData}>

     

  <div class="form-group">
  <label for="inputDate">Date : </label>
  <input type="text" class="form-control" style={{width:"500px"}} id="Date" value={Date} placeholder="Enter Date"
    onChange={(e) => {
      setDate(e.target.value)
    }} />
  {errors && Date.length <= 0 ? <label className="validation-label">Date cannot be empty</label> : ""}
</div>


<div class="form-group">
  <label for="inputDambulla">Dambulla : </label>
  <input type="text" class="form-control" style={{width:"500px"}} id="Dambulla" value={Dambulla} placeholder="Enter Quantity"
    onChange={ handledabullaChange} />
  {errors && Dambulla.length <= 0 ? <label className="validation-label">Dambulla cannot be empty</label> : ""}
</div>


<div class="form-group">
  <label for="inputMatale">Matale : </label>
  <input type="text" class="form-control" style={{width:"500px"}} id="Matale" value={Matale} placeholder="Enter Quantity"
    onChange={ handlemathaleChange} />
  {errors && Matale.length <= 0 ? <label className="validation-label">Matale cannot be empty</label> : ""}
</div>


<div class="form-group">
  <label for="inputKandy">Kandy : </label>
  <input type="text" class="form-control" style={{width:"500px"}} id="Kandy" value={Kandy} placeholder="Enter Quantity"
    onChange={ handlekandyChange} />
  {errors && Kandy.length <= 0 ? <label className="validation-label">Kandy cannot be empty</label> : ""}
</div>

<div class="form-group">
  <label for="inputKandy">total </label>
  <input type="text" class="form-control" style={{width:"500px"}} id="total" value={total} placeholder="Enter Quantity"
    onChange={(e) => {
      setKandy(e.target.value)
    }} />
  {errors && Kandy.length <= 0 ? <label className="validation-label">Kandy cannot be empty</label> : ""}
</div>


<div class="form-group">
  <label for="vehicleId">vehicleId: </label>
  <input type="text" class="form-control" style={{width:"500px"}} id="Kandy" value={vehicleId} placeholder="Enter vehicle Id"
    onChange={(e) => {
      setvehicleId(e.target.value)
    }} />
  {errors && vehicleId.length <= 0 ? <label className="validation-label">vehicleId cannot be empty</label> : ""}
</div>



<div class="form-group">
  <label for="inputdrivername">drivername : </label>
  <input type="text" class="form-control" style={{width:"500px"}} id="drivername" value={drivername} placeholder="Enter drivername"
    onChange={(e) => {
      setdrivername(e.target.value)
    }} />
  {errors && drivername.length <= 0 ? <label className="validation-label">drivername cannot be empty</label> : ""}
</div>
      
      
<br/>
                    <button type="submit" class="btn-add btn btn-success" style={{background: 'linear-gradient(#F7971E,#FFD200)',width:'80px'}}>Add</button>
                    &nbsp;&nbsp;
                    <Link className ="btn-back btn btn-primary" style={{background: 'linear-gradient(royalblue,tomato)',width:'80px'}} to={"/allDistribution"}>
                    <i class="fa-solid fa-backward"></i>&nbsp;Back
                    </Link>
                </form>
            </div>
            <Footer/>
  </div>   
       
    )
}
