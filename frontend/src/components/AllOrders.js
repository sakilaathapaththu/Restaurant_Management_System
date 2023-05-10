import axios from 'axios';
import React, {useState, useEffect} from 'react';
import jsPDF from "jspdf";
import autotable from "jspdf-autotable";
import { toast, ToastContainer } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import DeleteOrder from './DeleteOrder';
import Header from "./Header";
import Footer from './Footer';

export default function AllOrders() {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState("");

    const { id } = useParams();

    useEffect(() => {
        getOrders();
    }, [])
    

    function getOrders() {
        axios.get("http://localhost:8070/orders/allOrders").then((res) => {
            console.log(res.data);
            setOrders(res.data)
        }).catch((error) => {
            alert(error.message)
        })
    }
    function DeleteOrder(id) {
        if (!id) {
            console.error("ID is undefined or null.");
            return;
        }
        axios.delete(`http://localhost:8070/orders/deleteOrder/` + id)
            .then(function () {
                console.log("Order details deleted");
                toast.success("Order details deleted", { theme: 'colored' });
                getOrders();
            })
            .catch(function (error) {
                console.error(error);
                alert("Failed to delete Order details.");
            });
    }
    
    //search
    function handleFilterChange(e) {
        setFilter(e.target.value);
      }
      const filteredOrders = orders.filter((ord) => {
        return ord.itemCode.toLowerCase().includes(filter.toLowerCase());
    
      })

    // Generate PDF
    function generatePDF(bills) {
        const unit = "pt";
        const size = "A3"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Order Details";
        const headers = [
            ["Order ID", "Customer ID", "Customer Name", "Item Type", "No. of Items", "Greeting", "Ordered Date", "Due Date"],
        ];

        const data = filteredOrders.map((ord) => [
            ord.itemCode,
            ord.cusId,
            ord.cusName,
            ord.filepath,
            ord.itemType,
            ord.noOfItems,
            ord.greeting,
            ord.orderDate,
            ord.dueDate
        ]);

        let content = {
            startY: 50,
            head: headers,
            body: data,
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("OrderReport.pdf");
        toast("Order Report Downloaded");
    };

    return (
        <div>
            <Header/>
            <div 
        style= {{
          
          backgroundImage: `url("OrderImages/finance-background.jpg")`,
        //backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        backgroundSize: 'cover',
        //background-size: cover;
        backgroundPosition: 'center',
        maxWidth: '100%',
        opacity: '500'


      }}>

<div className="page-content container">

     <h1>Order Dashboard</h1>
     
     <form class="d-flex justify-content-end" role="search">
                <input onChange={handleFilterChange} class="form-control me-2 w-auto" type="search" placeholder="Search" aria-label="Search"/>
                <button class="search-btn btn btn-outline-info" type="submit">Search</button>
            </form>

        <table className="table border shadow table table-striped border" style={{fontWeight:'bold'}}>
        <thead>
            <tr>
                
                <th scope="col">#</th>
                <th scope="col">Order ID</th>
                <th scope="col"> Customer ID</th>
                <th scope="col"> Customer Name</th>
                <th scope="col"> Design</th>
                <th scope="col"> Item Type </th>
                <th scope="col">No. of Items</th>
                <th scope="col">Greeting</th>
                <th scope="col"> Ordered Date</th>
                <th scope="col"> Due Date</th>
            </tr>
        </thead>
        <tbody>
            {filteredOrders.map((ord,index)=>{
                return(
                    <tr key={index}>
                        <th scope="row">{index+1}</th>
                                <td>{ord.itemCode}</td>
                                <td>{ord.cusId}</td>
                                <td>{ord.cusName}</td>
                                <td>{ord.filepath}</td>
                                <td>{ord.itemType}</td>
                                <td>{ord.noOfItems}</td>
                                <td>{ord.greeting}</td>
                                <td>{ord.orderDate}</td>
                                <td>{ord.dueDate}</td>
                                <td>
                       <Link className ="btn btn-warning" to={"/updateOrder/" + ord._id} style={{paddingRight: '20px'}}>
                                    <i className="fas fa-edit"  ></i> &nbsp;Edit
                                    </Link>
                                    &nbsp;
    
                                    <Link className ="btn btn-danger" href="#" onClick={() => DeleteOrder(ord._id)}style={{paddingRight: '10px'}}>
                                    <i className="fas fa-trash-alt"></i>&nbsp;Delete
                                    </Link>
                       </td>
                       
                    </tr>
                );
            })}
             
        </tbody>

        </table>

        

        <Link className ="btn btn-success" to={"/addOrder/"}>
            <i class="fa-solid fa-plus"></i>&nbsp;Add New Order
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

