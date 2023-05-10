import React,{ useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import updateFinanceImage from "../images/updateFinance.png";
import Header from "../components/Header";
import Footer from '../components/Footer';

export default function UpdateFinance(){
    const { id } = useParams();

    const [finance,setFinance] = useState([]);
    const [InvoiceID,setInvoiceID] = useState("");
    const [BillName,setBillName] = useState("");
    const [AccountNo,setAccountNo] = useState("");
    const [Amount,setAmount] = useState("");
    const [PaymentDate,setPaymentDate] = useState("");
    const [errors,setError] = useState("");

    useEffect(() => {
        function getFinance(){
            axios.get("http://localhost:8070/finances/get/" + id).then((res) => {
                console.log(res.data);
                setFinance(res.data);
                setInvoiceID(res.data.InvoiceID)
                setBillName(res.data.BillName)
                setAccountNo(res.data.AccountNo)
                setAmount(res.data.Amount)
                setPaymentDate(res.data.PaymentDate)
            }).catch((error) => {
                alert(error.message);
            })
        }
        getFinance();
    }, [id])

    function handle(e){
        e.preventDefault();

        if(InvoiceID.length===0 || BillName.length===0 || AccountNo.length===0 || Amount.length===0 || PaymentDate.length===0){
            setError(true);
        }
        else{
            const UpdateFinance = {
                InvoiceID,
                BillName,
                AccountNo,
                Amount,
                PaymentDate
            }
    
            console.log(UpdateFinance)
    
            axios.put("http://localhost:8070/finances/update/" + id, UpdateFinance).then(function(){
                toast.success("Finance Bill Updated Sucessfully!",{theme:'colored'});
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
                <div className="updateFinanceImg">
                <img src={updateFinanceImage} alt="FinanceImage" style={{height:'400px' , width:'600px', marginTop:'50px'}}></img>
                </div>

                &nbsp;&nbsp;&nbsp;&nbsp;

                <div className="updateFinanceForm" style={{
                    boxShadow: "0 0 10px 0 white",
                    padding: "20px",
                    borderRadius: "10px",
                    backgroundColor: "#F5F5F5",
                    outline: "2px solid blue"
                }}>
                <h1 style={{color:"#00BFFF"}}>Edit Bill</h1>
                <form onSubmit={handle}>
                    <div class="form-group">
                        <label for="inputInvoiceID">InvoiceID : </label>
                        <input type="text" class="form-control" style={{width:"500px"}} name="InvoiceID" aria-describedby="emailHelp" value={InvoiceID} placeholder={`Enter InvoiceID (${InvoiceID})`}
                        onChange={(e) => {
                            setInvoiceID(e.target.value);
                        } } />
                        {errors&&InvoiceID.length<=0?<label className="validation-label">InvoiceID cannot be empty</label>:""}
                    </div>
                    <div class="form-group">
                        <label for="inputBillName">BillName : </label>
                        <input type="text" class="form-control" name="BillName" value={BillName} placeholder="Enter Bill Name"
                        onChange={(e) => {
                            setBillName(e.target.value);
                        } }/>
                        {errors&&BillName.length<=0?<label className="validation-label">BillName cannot be empty</label>:""}
                    </div>
                    <div class="form-group">
                        <label for="inputAccountNo">Account No : </label>
                        <input type="number" class="form-control" name="AccountNo" value={AccountNo} placeholder="Enter AccountNo"
                        onChange={(e) => {
                            setAccountNo(e.target.value);
                        } }/>
                        {errors&&AccountNo.length<=0?<label className="validation-label">AccountNo cannot be empty</label>:""}
                    </div>
                    <div class="form-group">
                        <label for="inputAmount">Amount : </label>
                        <input type="number" class="form-control" name="Amount" value={Amount} placeholder="Enter Amount"
                        onChange={(e) => {
                            setAmount(e.target.value);
                        } }/>
                        {errors&&Amount.length<=0?<label className="validation-label">Amount cannot be empty</label>:""}
                    </div>
                    <div class="form-group">
                        <label for="inputPaymentDate">PaymentDate : </label>
                        <input type="date" class="form-control" name="PaymentDate" value={PaymentDate} placeholder="Enter Payment Date(eg:2022-03-02)"
                        onChange={(e) => {
                            setPaymentDate(e.target.value);
                        } }/>
                        {errors&&PaymentDate.length<=0?<label className="validation-label">PaymentDate cannot be empty</label>:""}
                    </div>
                    
                    <br/>
                    <button type="submit" class="btn-update btn btn-primary" style={{background: 'linear-gradient(#F7971E,#FFD200)',width:'100px'}}>Update</button>
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