import React,{useState, useRef} from "react";
import axios from "axios"
import additempic from '../images/inventorypic1.jpg';
import Header from "./Header";
import Footer from './Footer';

export default function Insertitem(){
    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unitprice, setUnitprice] = useState("");
    const [totalprice, setTotalprice] = useState("");

    const formRef = useRef();
    
    function senddata(e){
        e.preventDefault();
        

        const newitem ={
            type,
            name,
            date,
            quantity,
            unitprice,
            totalprice
        }
        
        axios.post("http://localhost:8070/inventories/add",newitem)
        .then((res)=>{alert("stock added");
        formRef.current.reset();
          if(res.newitem.success){
            this.setState(
              {
                
                type:"",
                name:"",
                date:"",
                quantity:"",
                unitprice:"",
                totalprice:""
              }
            )
          }
        })


    }
   // Function to calculate the total price
   function handleQuantityChange(e) {
    const quantity = e.target.value;
    const totalprice = quantity * unitprice;
    setQuantity(quantity);
    setTotalprice(totalprice);
  }

  function handleUnitPriceChange(e) {
    const unitprice = e.target.value;
    const totalprice = quantity * unitprice;
    setUnitprice(unitprice);
    setTotalprice(totalprice);
  }




   
    return(
      <div>
        <Header/>
        <div className="container" style={{display:"flex"}}>
     <div>
      <img src={additempic} alt="Logo"  style={{height:'400px' , width:'600px', marginTop:'50px'}} class="d-inline-block align-text-top"></img>
      </div>
      
        <div className="container">
        <h1 style={{color:"#00BFFF"}}>Add New Stock Record</h1>
        <form ref={formRef} onSubmit={senddata}>
        <div className="mb-3">
          <label for="type" className="form-label">Inventory Type </label><br></br>
          <select className="form-control" id="type" required onChange={(e)=>{setType(e.target.value);}}>
              <option selected value="" disabled>--Please choose an option--</option>
              <option value="Food">Food</option>
              <option value="Kitchen">Kitchen Items</option>
              <option  value="Vehicles">Vehicles</option>
              <option value="Farnichar">Farnichar</option>
          </select>
         
          
        </div>
        <div className="mb-3">
          <label for="name" className="form-label">Item Name</label>
          <input type="text" className="form-control" id="name" placeholder="Enter Item Name" required onChange={(e)=>{setName(e.target.value);} }></input>
          
        </div>
        <div className="mb-3">
          <label for="date" className="form-label">Date</label>
          <input type="date" className="form-control" id="date" placeholder="enter date" required onChange={(e)=>{setDate(e.target.value);}} min={type === "Food" ? new Date().toISOString().split("T")[0] : null}></input>
           
        </div>
        <div className="mb-3">
          <label for="quantity" className="form-label">Item Quantity(1kg or number of item)</label>
          {type === "Food" && <span className="input-group-text">kg</span>}
          <input type="number" className="form-control" id="quantity" placeholder="Enter Number Of Item" required onChange={handleQuantityChange}></input>
          
        </div>
        <div className="mb-3">
          <label for="unitprice" className="form-label">Unit Price(1kg or number of item)</label>
          <span className="input-group-text">LKR &nbsp;
          <input type="number" className="form-control" id="unitprice" placeholder="Enter Unit Cost" required onChange={handleUnitPriceChange}></input></span>
          
        </div>
        <div className="mb-3">
          <label for="totalprice" className="form-label">Total Item Price</label>
          <span className="input-group-text">LKR &nbsp;
          <input type="number" className="form-control" id="totalprice" value={totalprice}   onChange={(e)=>{setTotalprice(e.target.value);}}  disabled></input></span>
          
        </div>
        <button type="submit" className="btn btn-primary" style={{background: 'linear-gradient(#F7971E,#FFD200)'}}>Submit</button>&nbsp;
        <a className="btn btn-primary" href={"/viewinventory"} style={{background: 'linear-gradient(#F7971E,#FFD200)'}}>Back
          </a>&nbsp;
      </form>
      <br></br>
      <br></br>
      </div>
      </div> 
      <Footer/>
      </div>
  
    )
}
