import React, { useState, useEffect } from 'react';
import axios from 'axios';
import edititempic from "../images/inventorypic2.png";
import Header from "./Header";
import Footer from './Footer';
import { useParams, useNavigate } from 'react-router-dom';

const Updateitem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [inventories, setTables] = useState({
    type:'',
    name: '',
    date:'',
    quantity:'',
    unitprice:'',
    totalprice:'',
    
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/inventories/post/${id}`);
        const data = response.data.post;
        setTables(data);
      } catch (error) {
        console.log(error);
        setError('Error retrieving table data');
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "quantity" || name === "unitprice") {
      calculateTotalPrice(name, value);
    }
    
    
    setTables((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const calculateTotalPrice = (name, value) => {
    let newQuantity = name === "quantity" ? parseInt(value) : inventories.quantity;
    let newUnitPrice = name === "unitprice" ? parseFloat(value) : inventories.unitprice;
  
    const newTotalPrice = newQuantity * newUnitPrice;
  
    if (!isNaN(newTotalPrice)) {
      setTables((prevState) => ({
        ...prevState,
        totalprice: newTotalPrice.toFixed(2)
      }));
    } else {
      setTables((prevState) => ({
        ...prevState,
        totalprice: ""
      }));
    }
  };
  

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTables = {
        ...inventories,
       
      };
      await axios.put(`http://localhost:8070/inventories/update/${id}`, updatedTables);
      alert('Reservation updated successfully');
      navigate(-1);
    } catch (error) {
      console.log(error);
      setError('Error updating reservation');
    }
  };

  
  
  
 


  return (
    <div>
        <Header/>
      <div className="container" style={{ display: "flex" }}>
        <div>
          <img
            src={edititempic}
            alt="Logo"
            style={{ height: "400px", width: "600px", marginTop: "50px" }}
            class="d-inline-block align-text-top"
          ></img>
        </div>

        <div className="container">
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <h1 style={{ color: "#00BFFF" }}>Update Stock Record</h1>
              <label htmlFor="type" className="form-label">
                Inventory Type{" "}
              </label>
              <br></br>
              <select
                className="form-control"
                name="type"
                value={inventories.type}
                onChange={handleInputChange}
                disabled
              >
                <option selected value="" disabled>
                  --Please choose an option--
                </option>
                <option value="Food">Food</option>
                <option value="Kitchen">Kitchen</option>
                <option  value="Vehicles">Vehicles</option>
                <option value="Farnichar">Farnichar</option>
            </select>
                </div>
          <div className="mb-3">
            <label for="name" className="form-label">Item Name</label>
            <input type="text" className="form-control" name="name"  placeholder="Enter Item Name" required  value={inventories.name} onChange={handleInputChange }></input>
            
          </div>
          <div className="mb-3">
            <label for="date" className="form-label">Date</label>
            <input type="date" className="form-control" name="date" placeholder="enter date"  value={inventories.date} required onChange={handleInputChange } min={inventories.type === "Food" ? new Date().toISOString().split("T")[0] : null}></input>
            
          </div>
          <div className="mb-3">
            <label for="quantity" className="form-label">Item Quantity</label>
            {inventories.type === "Food" && (
              <span className="input-group-text">kg</span>)}
            <input type="number" className="form-control" name="quantity" placeholder="Enter Number Of Item" required value={inventories.quantity} onChange={handleInputChange }></input>
            
          </div>
          <div className="mb-3">
            <label for="unitprice" className="form-label">Unit Price</label>
            <span className="input-group-text">LKR &nbsp;
            <input type="number" className="form-control" name="unitprice" placeholder="Enter Unit Cost" required value={inventories.unitprice} onChange={handleInputChange }></input></span>
            
          </div>
          <div className="mb-3">
            <label for="totalprice" className="form-label">Total Item Price</label>
            <span className="input-group-text">LKR &nbsp;
            <input type="number" className="form-control" name="totalprice"   value={inventories.totalprice} onChange={handleInputChange }disabled></input></span>
            
          </div>
          <button type="submit" className="btn btn-success"  style={{background: 'linear-gradient(#F7971E,#FFD200)'}}>update</button>&nbsp;
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
export default Updateitem;