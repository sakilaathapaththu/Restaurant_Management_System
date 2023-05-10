import React,{ useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autotable from "jspdf-autotable";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../styles.css";
import Header from "./Header";
import Footer from './Footer';


export default function AllDistribution() {

    const [Distribution, setdistribution] = useState([]);
    const [filter, setFilter] = useState("");

    const { id } = useParams();

    useEffect(() => {
        getDistribution();
    },[])   

        function getDistribution(){
            axios.get("http://localhost:8070/distributions/").then((res) =>{
                setdistribution(res.data)
                setdistribution(res.data);
               }).catch ((err)=>{
                alert(err.message);
            })
        }
     
      
        
       
    function deleteDistribution(id) {
        if (!id) {
            console.error("ID is undefined or null.");
            return;
        }
        axios.delete(`http://localhost:8070/distributions/delete/${id}`)
            .then(function() {
                console.log("Distribution details deleted");
                toast.success("Distribution details deleted",{theme:'colored'});
                getDistribution();
            })
            .catch(function(error) {
                console.error(error);
                alert("Failed to delete Distribution details.");
            });
    } 


     //Search
     function handleFilterChange(e) {
        setFilter(e.target.value);
      }
  
      const filtereddistributions = Distribution.filter((dis) => {
        return dis.Date.toLowerCase().includes(filter.toLowerCase());
      })



      //Generate PDF
    function generatePDF(distributions) {
        const unit = "pt";
        const size = "A3"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
      
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
      
        doc.setFontSize(15);
      
        const title = "Distribution Details";
        const headers = [
          ["Date", "Dambulla", "Matale", "Kandy", "Vehicle ID", "Driver name"],
        ];
      
        const data = filtereddistributions.map((Distribution) => [
            Distribution.Date,
            Distribution.Dambulla,
            Distribution.Matale,
            Distribution.Kandy,
            Distribution.total,
            Distribution.vehicleId,
            Distribution.drivername,
        ]);
      
        let content = {
          startY: 50,
          head: headers,
          body: data,
        };
      
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Distributiondetails.pdf");
        toast("Distribution Report Downloaded");
    };

    



    return(
        <div>
            <Header/>
            <div className="page-content container">
            <h1>Distribution Dashboard</h1>

            <form class="d-flex justify-content-end" role="search">
                <input onChange={handleFilterChange} class="form-control me-2 w-auto" type="search" placeholder="Search Date" aria-label="Search"/>
                <button class="search-btn btn btn-outline-info" type="submit">Search </button>
            </form>

            <table className="table border shadow table table-striped border" style={{fontWeight:'bold'}}>
                <thead>
                    <tr>
                    <th scope="col"></th>
                    <th scope="col">Date</th>
                    <th scope="col">Dambulla</th>
                    <th scope="col" >Matale</th>
                    <th scope="col" >Kandy</th>
                    <th scope="col" >Total</th>
                    <th scope="col">Vehicle ID</th>
                    <th scope="col" >Driver's name</th>
                    </tr>
                </thead>

                <tbody>
                    {filtereddistributions.map((Distribution,index) => {
                        return(
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                
                        <td>{Distribution.Date}</td> 
                       <td>{Distribution.Dambulla}</td>
                       <td>{Distribution.Matale}</td>
                       <td>{Distribution.Kandy}</td>
                       <td>{Distribution.total}</td>
                       <td>{Distribution.vehicleId}</td>
                       <td>{Distribution.drivername}</td>
                       <td>
                                    <Link className ="btn btn-warning" to={"/updateDistribution/" + Distribution._id}>
                                    <i className="fas fa-edit"></i>&nbsp;Edit
                                    </Link>
                                    &nbsp;
                                    <Link className ="btn btn-danger" href="#" onClick={() => deleteDistribution(Distribution._id)}>
                                    <i className="fas fa-trash-alt"></i>&nbsp;Delete
                                    </Link>
                                    
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>


            <Link className ="btn btn-success" to={"/addDistribution/"}>
            <i class="fa-solid fa-plus"></i>&nbsp;Add Distribution
            </Link>
            
           &nbsp;&nbsp;
            <button type="submit" class="btn-update btn btn-primary" style={{background: 'linear-gradient(#F7971E,#FFD200)',width:'180px'}} 
            onClick={() => generatePDF()}><i class="fa-solid fa-download"></i> Download Report</button>
            <ToastContainer></ToastContainer>
        </div>
        <Footer/>
        </div>
    )
}