import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddOrderImage from "../images/add-order.jpg";
import axios from "axios";
import FinanceBackground from "../images/finance-background.png"
import Header from "./Header";
import Footer from './Footer';


export default function AddOrder() {
  const [itemCode, setID] = useState("");
  const [cusId, setCusId] = useState("");
  const [cusName, setName] = useState("");
  const [filepath, setFilepath]= useState("");
  const [itemType, setType] = useState("");
  const [noOfItems, setNoOfItems] = useState("");
  const [greeting, setGreeting] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setError] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  function handleImage(e) {
    console.log(e.target.files);
    setFilepath(e.target.files[0])

  }
 

  

  function sendData(e){
    e.preventDefault();
    
    if(itemCode.length===0 || cusId.length===0 || cusName.length===0 || itemType.length===0 || noOfItems.length===0 || greeting.length===0 || orderDate.length===0 || dueDate.length===0 ){
      setError(true);
  }
  else{
        const formData = {
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
    }

    const formData = new FormData();


    formData.append('itemCode', itemCode);
    formData.append('cusId', cusId);
    formData.append('cusName', cusName);
    formData.append('filepath', filepath);
    formData.append('itemType', itemType);
    formData.append('noOfItems', noOfItems);
    formData.append('greeting', greeting);
    formData.append('orderDate', orderDate);
    formData.append('dueDate', dueDate);


    axios.post("http://localhost:8070/orders/add", formData).then(()=>{
      alert("Order Added")
      window.location = "/addOrder";
      
    }).catch((err)=>{
      alert(err)
    })
  }


    return(

      <div>
        <Header/>
        <div 
      style= {{
        
        backgroundImage: `url("../images/finance-background.jpg")`,
      //backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      backgroundSize: 'cover',
      //background-size: cover;
      backgroundPosition: 'center',
      maxWidth: '100%',
      opacity: '500'


    }}>

        <div className= "container" style={{display:"flex"}}>
          <div className="addFinanceImg"> <img src={AddOrderImage} alt="FinanceImage" style={{height:'380px' , width:'600px', marginTop:'50px'}}></img>
          </div>

          &nbsp;&nbsp;&nbsp;&nbsp;

          <div className="addOrderForm">
          <h1 style={{color:"#00BFFF"}}>Add New Order</h1>
        <form onSubmit={sendData}>
           <div class="form-group">
    <label for="name">Order ID :</label>
    <input type="text" className="form-control" style={{width:"500px"}} id="itemCode"  aria-describedby="emailHelp" placeholder="Enter Order ID"
    onChange={(e)=>{

      setID(e.target.value);
    }}/>

{errors&&itemCode.length<=0?<label className="validation-label">Order ID cannot be empty</label>:""}
  </div>
  <div className="form-group"><br></br>
  <label for="name">Customer ID :</label>
    <input type="text" class="form-control" id="name" placeholder="Enter Customer ID"
    onChange={(e)=>{

      setCusId(e.target.value);
}}/>

{errors&&cusId.length<=0?<label className="validation-label">Customer ID cannot be empty</label>:""}
  </div>

          <div className="form-group"><br></br>
  <label for="name">Customer Name    :</label>
    <input type="text" className="form-control" id="cusId" placeholder="Enter Customer Name  "
    onChange={(e)=>{

      setName(e.target.value);
}}/>
         {errors&&cusId.length<=0?<label className="validation-label">Customer Name cannot be empty</label>:""}
  </div>  

  

  <div className="form-group"><br></br>
  <label for="name">Item Type    :</label>
    <input type="text" className="form-control" id="itemType" placeholder="Enter Item Type"
    onChange={(e)=>{

      setType(e.target.value);
}}/>
{errors&&itemType.length<=0?<label className="validation-label">Item Type cannot be empty</label>:""}
  </div>

  <div className="form-group"><br></br>
  <label for="name">No. of Items   :</label>
    <input type="text" className="form-control" id="noOfItems" placeholder="Enter No. of Items"
    onChange={(e)=>{

      setNoOfItems(e.target.value);
}}/>
{errors&&noOfItems.length<=0?<label className="validation-label">No. of Items cannot be empty</label>:""}
  </div>

  <div className="form-group"><br></br>
  <label for="name">Greeting    :</label>
    <input type="text" className="form-control" id="greeting" placeholder="Enter Greeting  "
    onChange={(e)=>{

      setGreeting(e.target.value);
}}/>
{errors&&greeting.length<=0?<label className="validation-label">Greeting cannot be empt. If you don't want a greeting, enter N/A.</label>:""}
  </div>

  <div className="form-group"><br></br>
  <label for="name">Ordered Date  :</label>
  <DatePicker selected={orderDate} className="form-control"  onChange={(date) => setOrderDate(date)} />

  {errors&&orderDate.length<=0?<label className="validation-label">Ordered Date cannot be empty</label>:""}
  </div>
  
  <div className="form-group"><br></br>
  <label for="name">Due Date   :</label>
  <DatePicker selected={dueDate} className="form-control"  onChange={(date) => setDueDate(date)} />

  {errors&&dueDate.length<=0?<label className="validation-label">Due Date cannot be empty</label>:""}
  </div>
 
 <br></br>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
   </div>
   </div>
  </div>
<Footer>
</Footer>
      </div>
   
    )
}