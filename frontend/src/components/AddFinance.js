import React,{ useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddFinanceImage from "../images/addFinance.png";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../styles.css';
import Header from './Header';
import Footer from './Footer';

export default function AddFinance(){
    const [InvoiceID,setInvoiceID] = useState("");
    const [BillName,setBillName] = useState("");
    const [AccountNo,setAccountNo] = useState("");
    const [Amount,setAmount] = useState("");
    const [PaymentDate,setPaymentDate] = useState("");
    const [errors,setError] = useState("");

    function sendData(e){
        e.preventDefault(); 

        if(InvoiceID.length===0 || BillName.length===0 || AccountNo.length===0 || Amount.length===0 || PaymentDate.length===0){
            setError(true);
        }
        else{
            const newBill = {
                InvoiceID,
                BillName,
                AccountNo,
                Amount,
                PaymentDate
            }
    
            axios.post("http://localhost:8070/finances/add",newBill).then(() => {
                //console.log("New Bill Added Successfully!");
                toast.success("Finance Bill Added Successfully!",{theme:'colored'});
                setInvoiceID("");
                setBillName("");
                setAccountNo("");
                setAmount("");
                setPaymentDate("");
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
                <div className="addFinanceImg">
                <img src={AddFinanceImage} alt="FinanceImage" style={{height:'380px' , width:'600px', marginTop:'50px'}}></img>
                </div>

                &nbsp;&nbsp;&nbsp;&nbsp;

                <div className="addFinanceForm" style={{
                    boxShadow: "0 0 10px 0 white",
                    padding: "20px",
                    borderRadius: "10px",
                    backgroundColor: "#F5F5F5",
                    outline: "2px solid blue"
                }}>
                    <h1 style={{color:"#00BFFF"}}>Add New Bill</h1>
                    <form onSubmit={sendData}>
                        <div class="form-group">
                            <label for="inputInvoiceID">InvoiceID : </label>
                            <input type="text" class="form-control" style={{width:"500px"}} id="invoiceID" value={InvoiceID} aria-describedby="emailHelp" placeholder="Enter InvoiceID"
                            onChange={(e) => {
                                setInvoiceID(e.target.value)
                            } } />
                            {errors&&InvoiceID.length<=0?<label className="validation-label">InvoiceID cannot be empty</label>:""}
                        </div>
                        <div class="form-group">
                            <label for="inputBillName">BillName : </label>
                            <input type="text" class="form-control" id="billName" value={BillName} placeholder="Enter Bill Name"
                            onChange={(e) => {
                                setBillName(e.target.value);
                            } }/>
                            {errors&&BillName.length<=0?<label className="validation-label">BillName cannot be empty</label>:""}
                        </div>
                        <div class="form-group">
                            <label for="inputAccountNo">Account No : </label>
                            <input type="number" class="form-control" id="accountNo" value={AccountNo} placeholder="Enter AccountNo"
                            onChange={(e) => {
                                setAccountNo(e.target.value);
                            } }/>
                            {errors&&AccountNo.length<=0?<label className="validation-label">AccountNo cannot be empty</label>:""}
                        </div>
                        <div class="form-group">
                            <label for="inputAmount">Amount : </label>
                            <input type="number" class="form-control" id="amount" value={Amount} placeholder="Enter Amount"
                            onChange={(e) => {
                                setAmount(e.target.value);
                            } }/>
                            {errors&&Amount.length<=0?<label className="validation-label">Amount cannot be empty</label>:""}
                        </div>
                        <div class="form-group">
                            <label for="inputPaymentDate">PaymentDate : </label>
                            <input type="date" class="form-control" id="paymentDate" value={PaymentDate} placeholder="Enter Payment Date(eg:2022-03-02)"
                            onChange={(e) => {
                                setPaymentDate(e.target.value);
                            } }/>
                            {errors&&PaymentDate.length<=0?<label className="validation-label">PaymentDate cannot be empty</label>:""}
                        </div>
                        
                        <br/>
                        <button type="submit" class="btn-add btn btn-success" style={{background: 'linear-gradient(#F7971E,#FFD200)',width:'80px'}}>Add</button>
                        &nbsp;&nbsp;
                        <Link className ="btn-back btn btn-primary" style={{background: 'linear-gradient(royalblue,tomato)',width:'80px'}} to={"/financeDashboard"}>
                        <i class="fa-solid fa-backward"></i>&nbsp;Back
                        </Link>
                    </form>
                </div>   
            </div>
            <Footer/>
        </div>
    )
}