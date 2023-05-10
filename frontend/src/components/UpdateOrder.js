import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UpdateOrder() {
    const { id } = useParams();
    const [orders, setOrders] = useState([]);
    const [itemCode, setItemCode] = useState("");
    const [cusId, setCusId] = useState("");
    const [cusName, setCusName] = useState("");
    const [filepath, setFilepath] = useState("");
    const [itemType, setItemType] = useState("");
    const [noOfItems, setNoOfItems] = useState("");
    const [greeting, setGreeting] = useState("");
    const [orderDate, setOrderDate] = useState("");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        function getOrders() {
            axios.get("http://localhost:8070/orders/getOrder/" + id).then((res) => {
                console.log(res.data);
                setItemCode(res.data.itemCode)
                setCusId(res.data.cusId)
                setCusName(res.data.cusName)
                setFilepath(res.data.filepath)
                setItemType(res.data.itemType)
                setGreeting(res.data.greeting)
                setOrderDate(res.data.orderDate)
                setDueDate(res.data.dueDate)
            }).catch((err) => {
                alert(err.message);
            })
        }
        getOrders();
    }, [])

    function handle(e) {
        e.preventDefault();

        const updateOrder = {
            itemCode,
            cusId,
            cusName,
            filepath,
            itemType,
            noOfItems,
            greeting,
            orderDate,
            dueDate
        }

        console.log(updateOrder)

        axios.put("http://localhost:8070/orders/updateOrder/" + id, updateOrder)
            .then(function () {
                alert("Order data Updated")
            })
            .catch((err) => {
                alert(err)
            })
    }

    return (
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


        <div className="container">

            <form onSubmit={handle}>

            <div class="mb-3"> <br></br>
                        <div class="col">
                            <label for="itemCode" className="form-label">Order ID</label>
                            <input type="text" className="form-control" id="id" placeholder="Order ID" value={itemCode}
                                onChange={(e) => {

                                    setItemCode(e.target.value);

                                }} />
                        </div>
                        </div>
                        
                <div className="form-group">
                    <label for="name" className="form-label">Customer ID</label>
                    <input type="text" className="form-control" placeholder="Customer ID" value={cusId} onChange={(e) => {

setCusId(e.target.value);

                    }} />
                </div>
                
                <div className="form-group">
                
                   <label for="name" className="form-label">Customer Name</label>
                    <input type="text" className="form-control" placeholder="Customer Name" value={cusName} onChange={(e) => {

setCusName(e.target.value);

                    }} />
                </div>

                <div className="form-group">
                    <label for="name" className="form-label">Upload Image</label>
                    <input type="text" className="form-control" placeholder="Your image" value={filepath} onChange={(e) => {
                        setFilepath(e.target.value);
                    }} />
                </div>

                

                    <div className="form-group">
                    <label for="name" className="form-label">Item Type</label>
                    <input type="text" className="form-control" placeholder="Item Type" value={itemType} onChange={(e) => {

setItemType(e.target.value);

                    }} />
                    </div>


                    <div className="form-group">
                    <label for="name" className="form-label">No. of Items</label>
                    <input type="text" className="form-control" placeholder="No. of Items" value={noOfItems} onChange={(e) => {

setNoOfItems(e.target.value);

                    }} />
                    </div>

                    <div className="form-group">
                    <label for="name" className="form-label">Greeting</label>
                    <input type="text" className="form-control" placeholder="Greeting" value={greeting} onChange={(e) => {

setGreeting(e.target.value);

                    }} />
                    </div>

                    <div className="form-group">
                    <label for="name" className="form-label">Ordered Date</label>
                    <input type="text" className="form-control" placeholder="Ordered Date" value={orderDate} onChange={(e) => {

setOrderDate(e.target.value);

                    }} />
                    </div>

                    <div className="form-group">
                    <label for="name" className="form-label">Due Date</label>
                    <input type="text" className="form-control" placeholder="Due Date" value={dueDate} onChange={(e) => {

setDueDate(e.target.value);

                    }} />
                    </div>

                    <br />
                <button type="submit"  className="btn btn-primary">Submit</button>
            </form>

        </div>
        </div>

    )
}