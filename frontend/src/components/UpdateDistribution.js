import React,{ useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import updateFinanceImage from "../images/updatedistribution.jpg";
import Header from "./Header";
import Footer from './Footer';



export default function UpdateDistribution(){
    const { id } = useParams();
    const [errors, setError] = useState(null);
    
    const [Date, setDate] = useState("");
    const [Dambulla, setDambulla] = useState("");
    const [Matale, setMatale] = useState("");
    const [Kandy, setKandy] = useState("");
    const [vehicleId, setvehicleId] = useState("");
    const [drivername, setdrivername] = useState("");

    useEffect(() => {
        function getDistribution(){
            axios.get("http://localhost:8070/distributions/get/" + id).then((res) => {
                console.log(res.data);
                console.log(res.data);
                setDate(res.data.Date)
                setDambulla(res.data.Dambulla)
                setMatale(res.data.Matale)
                setKandy(res.data.Kandy)
                setvehicleId(res.data.vehicleId)
                setdrivername(res.data.drivername)
            }).catch((error) => {
                alert(error.message);
            })
        }
        getDistribution();
    }, [id])

    function handle(e){
        e.preventDefault();

         if(Date.length===0 || Dambulla.length===0 || Matale.length===0 || Kandy.length===0 ||  vehicleId.length===0 || drivername.length===0){
      setError(true);
        }
        else{
            const UpdateDistribution = {
              Date,
              Dambulla,
              Matale,
              Kandy,
              vehicleId,
              drivername
            }
    
            console.log(UpdateDistribution)
    
            axios.put("http://localhost:8070/distributions/update/" + id, UpdateDistribution).then(function(){
                toast.success("Distribution Updated Sucessfully!",{theme:'colored'});
                setDate("");
                setDambulla("");
                setMatale("")
                setKandy("");
                setvehicleId("");
                setdrivername("");
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
            <div className="updateFinanceImg">
            <img src={updateFinanceImage} alt="FinanceImage" style={{height:'400px' , width:'600px', marginTop:'50px'}}></img>
            </div>

            &nbsp;&nbsp;&nbsp;&nbsp;

            <div className="updateDistributionForm">
            <h1 style={{color:"#00BFFF"}}>Edit Distribution</h1>
            <form onSubmit={handle}>
                
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
    onChange={(e) => {
      setDambulla(e.target.value)
    }} />
  {errors && Dambulla.length <= 0 ? <label className="validation-label">Dambulla cannot be empty</label> : ""}
</div>


<div class="form-group">
  <label for="inputMatale">Matale : </label>
  <input type="text" class="form-control" style={{width:"500px"}} id="Matale" value={Matale} placeholder="Enter Quantity"
    onChange={(e) => {
      setMatale(e.target.value)
    }} />
  {errors && Matale.length <= 0 ? <label className="validation-label">Matale cannot be empty</label> : ""}
</div>


<div class="form-group">
  <label for="inputKandy">Kandy : </label>
  <input type="text" class="form-control" style={{width:"500px"}} id="Kandy" value={Kandy} placeholder="Enter Quantity"
    onChange={(e) => {
      setKandy(e.target.value)
    }} />
  {errors && Kandy.length <= 0 ? <label className="validation-label">Kandy cannot be empty</label> : ""}
</div>

<div class="form-group">
  <label for="inputVehicleId">VehicleId : </label>
  <input type="text" class="form-control" style={{width:"500px"}} id="vehicleId" value={vehicleId} placeholder="Enter vehicleId"
    onChange={(e) => {
      setvehicleId(e.target.value)
    }} />
  {errors && vehicleId.length <= 0 ? <label className="validation-label">VehicleId cannot be empty</label> : ""}
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
                <button type="submit" class="btn-update btn btn-primary" style={{background: 'linear-gradient(#F7971E,#FFD200)',width:'100px'}}>Update</button>
                &nbsp;&nbsp;
                <Link className ="btn-back btn btn-primary" style={{background: 'linear-gradient(royalblue,tomato)',width:'80px'}} to={"/allDistribution"}>
                <i class="fa-solid fa-backward"></i>&nbsp;Back
                </Link>
            </form>
            </div>
        </div>
        <Footer/>
        </div>
    )
}