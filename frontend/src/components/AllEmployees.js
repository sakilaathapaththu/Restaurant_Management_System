import axios from 'axios';
import React, {useState, useEffect} from 'react';
import jsPDF from "jspdf";
import autotable from "jspdf-autotable";
import { toast, ToastContainer } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import DeleteEmployee from './DeleteEmployee';
import "../styles.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Header from "./Header";
import Footer from './Footer';


export default function AllEmployees() {
    const [employees, setEmployees] = useState([]);
    const [filter, setFilter] = useState("");
  
    const { id } = useParams();
   
   

    useEffect(() => {
        getEmployees();
    }, [])
        function getEmployees(){
            axios.get("http://localhost:8070/employees/").then((res) =>{
                console.log(res.data);
                setEmployees(res.data);
               
        
            }).catch ((err)=>{
                alert(err.message);
            })
        }
        function DeleteEmployee(id) {
            if (!id) {
              console.error("ID is undefined or null.");
              return;
            }
          
            confirmAlert({
              title: 'Confirm Delete',
              message: 'Are you sure you want to delete this employee details?',
              buttons: [
                {
                  label: 'Yes',
                  onClick: () => {
                    axios.delete("http://localhost:8070/employees/delete/" + id)
                      .then(function() {
                        console.log("Employee details deleted");
                        toast.success("Employee details deleted",{theme:'colored'});
                        getEmployees();
                      })
                      .catch(function(error) {
                        console.error(error);
                        alert("Failed to delete employee details.");
                      });
                  }
                },
                {
                  label: 'No',
                  onClick: () => {
                    toast.info("Employee details not deleted",{theme:'colored'});
                  }
                }
              ]
            });
          }
        


    function handleFilterChange(e) {
      setFilter(e.target.value);
    }
    const filteredEmployees = employees.filter((emp) => {
      return emp.ID.toLowerCase().includes(filter.toLowerCase());
  
    })
    function generatePDF(bills) {
        const unit = "pt";
        const size = "A3"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
      
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
      
        doc.setFontSize(15);
      
        const title = "Employee Details";
        const headers = [
          ["Employee ID", " Name", "Contact Number", "Designation", "Join Date"],
        ];
      
        const data = filteredEmployees.map((emp) => [
          emp.ID,
          emp.name,
          emp.contact,
          emp.designation,
          emp.join
        ]);
      
        let content = {
          startY: 50,
          head: headers,
          body: data,
        };
      
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("EmployeeReport.pdf");
        toast("Employee Report Downloaded");
      };
    
      
  
    return(
        <div>
            <Header/>
            <div 
        style= {{
          
          backgroundImage: `url("EmployeeImages/finance-background.jpg")`,
        //backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        backgroundSize: 'cover',
        //background-size: cover;
        backgroundPosition: 'center',
        maxWidth: '100%',
        opacity: '500'


      }}>

<div className="page-content container">

     <h1>Employee Dashboard</h1>
     
     <form class="d-flex justify-content-end" role="search">
                <input onChange={handleFilterChange} class="form-control me-2 w-auto" type="search" placeholder="Search" aria-label="Search"/>
                <button class="search-btn btn btn-outline-info" type="submit">Search</button>
            </form>

        <table className="table border shadow table table-striped border" style={{fontWeight:'bold'}}>
        <thead>
            <tr>
                
                <th scope="col">#</th>
                <th scope="col">Employee ID</th>
                <th scope="col"> Name</th>
                <th scope="col"> Image</th>
                <th scope="col"> Contact </th>
                <th scope="col">Designation</th>
                <th scope="col">Join Date</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            {filteredEmployees.map((emp,index)=>{
                return(
                    <tr key={index}>
                        <th scope="row">{index+1}</th>
                       <td>{ emp.ID}</td>
                       <td>{emp.name}</td>
                       <center><img height={"100px"} width={"100px"} src={`http://localhost:8070/images/${emp.filepath}`} /></center><br></br><br></br>
                       <td>{emp.contact}</td>
                       <td>{emp.designation}</td>
                       <td>{emp.join}</td>
                       <td>
                       <Link className ="btn btn-warning" to={"/updateemployee/" + emp._id} style={{paddingRight: '20px'}}>
                                    <i className="fas fa-edit"  ></i> &nbsp;Edit
                                    </Link>
                                    &nbsp;
    
                                    <Link className ="btn btn-danger" href="#" onClick={() => DeleteEmployee(emp._id)}style={{paddingRight: '10px'}}>
                                    <i className="fas fa-trash-alt"></i>&nbsp;Delete
                                    </Link>
                       </td>
                       
                    </tr>
                );
            })}
             
        </tbody>

        </table>

        

        <Link className ="btn btn-success" to={"/addemployee/"}>
            <i class="fa-solid fa-plus"></i>&nbsp;Add New Employee
            </Link>
            &nbsp;&nbsp;
            <Link className ="btn btn-primary" to={"/addDaily/"}>
            <i class="fa-regular fa-file"></i>&nbsp;Add Daily Details
            </Link>
            &nbsp;&nbsp;
        <button type="submit" class="btn-update btn btn-primary" style={{background: 'linear-gradient(#F7971E,#FFD200)',width:'180px'}} 
            onClick={() => generatePDF()}><i class="fa-solid fa-download"></i> Download Report</button>
        <ToastContainer></ToastContainer>
        </div>
        </div>
        <Footer/>
        </div>
    )
}
