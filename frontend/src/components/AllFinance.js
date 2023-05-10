import React,{ useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autotable from "jspdf-autotable";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../styles.css";
import Header from "../components/Header";
import Footer from '../components/Footer';

export default function AllFinances(){
    const [finance,setFinance] = useState([]);
    const [filter, setFilter] = useState("");

    const { id } = useParams();

    useEffect(() => {
        getFinance();
    },[])

    function getFinance(){
        axios.get("http://localhost:8070/finances/financeDashboard").then((res) => {
            setFinance(res.data)
            setFinance(res.data);
        }).catch((error) => {
            alert(error.message)
        })
    }

    function deleteFinance(id) {
        if (!id) {
            console.error("ID is undefined or null.");
            return;
        }
        axios.delete(`http://localhost:8070/finances/delete/${id}`)
            .then(function() {
                console.log("Finance details deleted");
                toast.success("Finance details deleted",{theme:'colored'});
                getFinance();
            })
            .catch(function(error) {
                console.error(error);
                alert("Failed to delete finance details.");
            });
    }

    //Search
    function handleFilterChange(e) {
      setFilter(e.target.value);
    }

    const filteredFinances = finance.filter((fin) => {
      return fin.BillName.toLowerCase().includes(filter.toLowerCase());
    })

    //Generate PDF
    function generatePDF(bills) {
        const unit = "pt";
        const size = "A3"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
      
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
      
        doc.setFontSize(15);
      
        const title = "Benthota Bake House - Finance Details";
        const headers = [
          ["Invoice ID", "Bill Name", "Account No", "Amount(Rs.)", "Payment Date"],
        ];
      
        const data = filteredFinances.map((fin) => [
          fin.InvoiceID,
          fin.BillName,
          fin.AccountNo,
          fin.Amount,
          fin.PaymentDate,
        ]);
      
        let content = {
          startY: 50,
          head: headers,
          body: data,
        };
      
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("FinanceReport.pdf");
        toast("Finance Report Downloaded");
      };
    
    return(
        <div>
            <Header/>
            <div className="page-content container">
                <h1>Finance Dashboard</h1>

                <form class="d-flex justify-content-end" role="search">
                    <input onChange={handleFilterChange} class="form-control me-2 w-auto" type="search" placeholder="Search" aria-label="Search"/>
                    <button class="search-btn btn btn-outline-info" type="submit">Search</button>
                </form>

                <table className="table border shadow table table-striped border" style={{fontWeight:'bold'}}>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Invoice ID</th>
                            <th scope="col">Bill Name</th>
                            <th scope="col">Account No</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Payment Date</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredFinances.map((fin,index) => {
                            return(
                                <tr key={index}>
                                    <th scope="row">{index+1}</th>
                                    
                                    <td>{fin.InvoiceID}</td>
                                    <td>{fin.BillName}</td>
                                    <td>{fin.AccountNo}</td>
                                    <td>{fin.Amount}</td>
                                    <td>{fin.PaymentDate}</td>
                                    <td>
                                        <Link className ="btn btn-warning" to={"/updateFinance/" + fin._id}>
                                        <i className="fas fa-edit"></i>&nbsp;Edit
                                        </Link>
                                        &nbsp;
                                        <Link className ="btn btn-danger" href="#" onClick={() => deleteFinance(fin._id)}>
                                        <i className="fas fa-trash-alt"></i>&nbsp;Delete
                                        </Link>
                                        
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <Link className ="btn btn-success" to={"/addFinance/"}>
                <i class="fa-solid fa-plus"></i>&nbsp;Add New Bill
                </Link>
                &nbsp;&nbsp;
                <Link className ="btn btn-primary" to={"/FinanceCalculations/"}>
                <i class="fa-regular fa-file"></i>&nbsp;Generate Report
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