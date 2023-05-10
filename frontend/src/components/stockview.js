import  React,{Component} from "react";
import axios from "axios";
import Swal from "sweetalert2";//Import the SweetAlert2 library for displaying alerts.
import Header from "./Header";
import Footer from './Footer';


class Stock extends Component{

    
    constructor(props){
        super(props);

        this.state = {
            posts:[],
            filterData: []
            
        };
    }

    componentDidMount(){
        this.retrievePosts();
    }

    retrievePosts(){
        axios.get("http://localhost:8070/inventories/inventories").then(res =>{
            if(res.data.success){
                this.setState({
                    posts:res.data.existingPosts,
                    filterData:res.data.existingPosts
                })
                console.log(this.state.posts)
            }
            
           
        })
    }
    //delete
   
    onDelete = (id) =>{
        axios.delete(`http://localhost:8070/inventories/delete/${id}`).then(function () {
            Swal.fire({
              icon: "success",
              title: "Table data deleted",
              confirmButtonText: "OK",
              
            }).then((res)=>{
                this.retrievePosts();
           
            
        });
    })
    }
    //search
    filterData(posts,searchkey){
        const result = posts.filter((post) =>
        post.type.toLowerCase().includes(searchkey)||
        post.name.toLowerCase().includes(searchkey)
        )
        this.setState({posts:result})
    }

    handleSerchArea =(e)=>{
        const searchkey =e.currentTarget.value;

        axios.get("http://localhost:8070/inventories/inventories").then(res =>{
            if(res.data.success){
                this.filterData(res.data.existingPosts,searchkey)
            }
        })
    }
    //Report generation
  generateReport = () => {
    const { filterData } = this.state;
    const reportData = filterData.map((posts) => ({ //reportData is an array that contains an object for each table with properties for each of the relevant table fields
      type: posts.type,
      name: posts.name,
      date: posts.date,
      quantity: posts.quantity,
      unitprice: posts.unitprice,
      totalprice: posts.totalprice,
    
    }));
    const reportWindow = window.open(); // open a new window/tab for the report
    reportWindow.document.write("<html><head><style>table{width: 100%;height: 500px;}, th, td {border: 1px solid black;border-collapse: collapse;}tr:nth-child(even) {background-color: rgba(150, 212, 212, 0.4);}th:nth-child(even),td:nth-child(even) {background-color: rgba(150, 212, 212, 0.4);}</style><title>Report</title></head><body>"); // start the HTML document for the report
    reportWindow.document.write("<img src='./images/bb.jpeg'>");
    reportWindow.document.write("<h1>Report</h1>"); // add a title to the report
    reportWindow.document.write("<table>"); // start a table for the report data
    reportWindow.document.write("<thead><tr><th>ID</th><th>Type</th><th>Name</th><th>Date</th><th>Quantity</th><th>Unit Cost</th><th>Total Cost</th></tr></thead><tbody>"); // add the table headers to the report
    reportData.forEach((posts, index) => { // loop through the report data and add a row for each item
      reportWindow.document.write(`<tr><td>${index + 1}</td><td>${posts.type}</td><td>${posts.name}</td><td>${posts.date}</td><td>${posts.quantity}</td><td>${posts.unitprice}</td><td>${posts.totalprice}</td></tr>`);
    });
    reportWindow.document.write("</tbody></table>"); // end the table for the report data
    reportWindow.document.write("</body></html>"); // end the HTML document for the report
    reportWindow.document.close(); // close the document for the report
    reportWindow.print(); // open the print dialog for the report window/tab
  };

        render(){
            let total = 0; // initialize total to 0
            
            return(
                <div>
                    <Header/>
                    <div className="container">
                    
                    <h1 class="text-center">All Stock</h1>
                    
                    
                   <div className="col-lg-3 mt-2 mb-2">
                        <input className="form-control " type="search" placeholder="Search" name="Search" onChange={this.handleSerchArea}></input>
                        
                        </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Item Type</th>
                                <th scope="col">Item Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Item Quantity</th>
                                <th scope="col">Unit Cost</th>
                                <th scope="col">Total Cost</th>
                                <th scope="col">Action</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                        
                            {this.state.posts && this.state.posts.map((posts,index)=>{
                                 
                                 total += posts.totalprice; 
                                 return(
                                <tr>
                                    <th scope="row">{index+1}</th>
                                    <td>{posts.type}</td>
                                    <td>{posts.name}</td>
                                    <td>{posts.date}</td>
                                    <td>{posts.type === "Food" ? `${posts.quantity} kg` : posts.quantity}</td>
                                    <td>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'LKR' }).format(posts.unitprice)}</td>
                                    <td>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'LKR' }).format(posts.totalprice)}</td>
                                    <td>
                                        <a className="btn btn-warning" href={`/inventoryedit/${posts._id}`}>
                                            <i className="fas fa-edit"></i>&nbsp;Edit
                                        </a>&nbsp;
                                        <a className="btn btn-danger" href="#" onClick={()=>this.onDelete(posts._id)}>
                                            <i className="far fa-trash-alt"></i>&nbsp;Delete
                                        </a>
                                    </td>
    
    
                                </tr>
                                 );
                                 })};
                       
                            <tr>
                              <td colSpan="6"></td>
                              <td><strong>Total:</strong></td>
                              <td>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'LKR' }).format(total)}</td>
                              <td></td>
                            </tr>
                        </tbody>
    
                    </table>
                    <a className="btn btn-info" href="/addinventory" style={{background: 'linear-gradient(#F7971E,#FFD200)'}}>
                                            <i className="far fa-info-alt"></i>&nbsp;Add New Item Details
                                        </a>&nbsp;&nbsp;
                    <button className="btn btn-info" onClick={this.generateReport} style={{background: 'linear-gradient(#F7971E,#FFD200)'}}>Generate Report</button>
                    <br></br><br></br><br></br><br></br>
                </div>
                <Footer/>
                </div>
                
            )
    
        }
    
    }

    


export default Stock;