import React, { Component} from "react";
import axios from "axios"


export default class EditItem extends Component{
    
  constructor(props){
      super(props);
      this.state={
          type:"",
          name:"",
          date:"",
          quantity:"",
          unitprice:"",
          totalprice:""
          
      }
  }
  componentDidMount=()=>{
    const id = this.props.match.params.id;

    axios.get(`http://localhost:8070/inventories/get/${id}`).then((res)=>{
        if(res.data.success){
            this.setState({
                type:res.data.post.type,
                name:res.data.post.name,
                date:res.data.post.date,
                quantity:res.data.post.quantity,
                unitprice:res.data.post.unitprice,
                totalprice:res.data.post.totalprice

            });
            console.log(this.state.post);
        }
    });
}
  handleInputChange =(e)=>{
      const{name,value} = e.target;

      this.setState({
          ...this.state,
          [name]:value
      })
  }

   senddata = (e)=>{
      e.preventDefault();
      const id = this.props.match.params.id;

      const{type,name,date,quantity,unitprice,totalprice}=this.state;
      

      const data ={
          type:type,
          name:name,
          date:date,
          quantity:quantity,
          unitprice:unitprice,
          totalprice:totalprice
      }
      console.log(data)

      axios.put(`http://localhost:8070/inventories/update/${id}`,data)
      .then((res)=>{
        alert("stock updated");
        if(res.data.success){
          
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

  

  render(){
      const { id } = this.props.match.params;
      return(
          <div className="container">
            
          <form>
          <div className="mb-3">
            <label for="type" className="form-label">Inventory Type </label><br></br>
            <select className="form-control" name="type"  value={this.state.type} onChange={this.handleInputChange }>
                <option selected value="" disabled>--Please choose an option--</option>
                <option value="Food">Food</option>
                <option value="Kitchen">Kitchen</option>
                <option  value="Vehicles">Vehicles</option>
                <option value="Farnichar">Farnichar</option>
            </select>
           
            
          </div>
          <div className="mb-3">
            <label for="name" className="form-label">Item Name</label>
            <input type="text" className="form-control" name="name"  placeholder="Enter Item Name"  value={this.state.name} onChange={this.handleInputChange }></input>
            
          </div>
          <div className="mb-3">
            <label for="date" className="form-label">Date</label>
            <input type="date" className="form-control" name="date" placeholder="enter date"  value={this.state.date} onChange={this.handleInputChange }></input>
            
          </div>
          <div className="mb-3">
            <label for="quantity" className="form-label">Item Quantity</label>
            <input type="number" className="form-control" name="quantity" placeholder="Enter Number Of Item"  value={this.state.quantity} onChange={this.handleInputChange }></input>
            
          </div>
          <div className="mb-3">
            <label for="unitprice" className="form-label">Unit Price</label>
            <input type="number" className="form-control" name="unitprice" placeholder="Enter Unit Cost"  value={this.state.unitprice} onChange={this.handleInputChange }></input>
            
          </div>
          <div className="mb-3">
            <label for="totalprice" className="form-label">Total Item Price</label>
            <input type="number" className="form-control" name="totalprice" placeholder="Enter Total Cost"  value={this.state.totalprice} onChange={this.handleInputChange }></input>
            
          </div>
          <button type="submit" className="btn btn-success" onClick={this.senddata}>update</button>&nbsp;
          <a className="btn btn-primary" href={"/viewinventory"}>Back
          </a>&nbsp;
        </form>
        <br></br>
      <br></br>
        </div>
      )
  }
}