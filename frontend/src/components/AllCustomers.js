import React,{ useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autotable from "jspdf-autotable";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
//import "../styles.css";
import Header from "./Header";
import Footer from './Footer';

export default function AllCustomers(){
    const [customer,setCustomer] = useState([]);
    const [filter, setFilter] = useState("");

    const { id } = useParams();

    useEffect(() => {
        getCustomer();
    },[])

    function getCustomer(){
        axios.get("http://localhost:8070/customers/customers").then((res) => {
            setCustomer(res.data)
            setCustomer(res.data);
        }).catch((error) => {
            alert(error.message)
        })
    }

    function deleteCustomer(id) {
        if (!id) {
            console.error("Reg No is undefined or null.");
            return;
        }
        axios.delete(`http://localhost:8070/customers/delete/${id}`)
            .then(function() {
                console.log("Customer details deleted");
                toast.success("Customer details deleted",{theme:'colored'});
                getCustomer();
            })
            .catch(function(error) {
                console.error(error);
                alert("Failed to delete customer details.");
            });
    }

    //Search
    function handleFilterChange(e) {
      setFilter(e.target.value);
    }

    const filteredCustomers = customer.filter((cus) => {
        return cus.Name && cus.Name.toLowerCase().includes(filter.toLowerCase());
    });
      

    //Generate PDF
    function generatePDF(customers) {
        const unit = "pt";
        const size = "A3"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
      
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
      
        doc.setFontSize(15);
      
        const title = "Customer Details";
        const headers = [
          ["Reg No", " Name", "Email", "Address", "Phone"],
        ];
      
        const data = filteredCustomers.map((cus) => [
          cus.RegNo,
          cus.Name,
          cus.Email,
          cus.Address,
          cus.Phone,

        ]);
      
        let content = {
          startY: 50,
          head: headers,
          body: data,
        };
      
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("CustomerReport.pdf");
        toast("Customer Report Downloaded");
      };
    
    return(
        <div>
            <Header/>
            <div className="page-content container">
            <h1>Customer Dashboard</h1>

            <form class="d-flex justify-content-end" role="search">
                <input onChange={handleFilterChange} class="form-control me-2 w-auto" type="search" placeholder="Search customers" aria-label="Search"/>
                <button class="search-btn btn btn-outline-info" type="submit">Search</button>
            </form>

            <table className="table border shadow table table-striped border" style={{fontWeight:'bold'}}>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Reg No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredCustomers.map((cus,index) => {
                        return(
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                
                                <td>{cus.RegNo}</td>
                                <td>{cus.Name}</td>
                                <td>{cus.Email}</td>
                                <td>{cus.Address}</td>
                                <td>{cus.Phone}</td>
                                <td>
                                    <a className ="btn btn-warning" href={"/updatecustomer/:id" + cus._id}>
                                    <i className="fas fa-edit"></i>&nbsp;Edit
                                    </a>
                                    &nbsp;
                                    <a className ="btn btn-danger" href="#" onClick={() => deleteCustomer(cus._id)}>
                                    <i className="fas fa-trash-alt"></i>&nbsp;Delete
                                    </a>
                                    
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <a className ="btn btn-success" href="/addcustomer">
            <i class="fa-solid fa-plus"></i>&nbsp;Add New Customer
            </a>
            
            &nbsp;&nbsp;
            <button type="submit" class="btn-update btn btn-primary" style={{background: 'linear-gradient(#F7971E,#FFD200)',width:'180px'}} 
            onClick={() => generatePDF()}><i class="fa-solid fa-download"></i> Download Report</button>
            <ToastContainer></ToastContainer>
        </div>
        <Footer/>
        </div>

    )
}