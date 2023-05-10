import React,{ useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Bar } from "react-chartjs-2";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Chart as chartjs, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import '../styles.css';
import Header from "../components/Header";
import Footer from '../components/Footer';

chartjs.register(
    BarElement, 
    CategoryScale, 
    LinearScale, 
    Tooltip, 
    Legend
)

export default function Calculation(){
    //Create reference to component
    const componentRef = useRef(null);

    //State for chart
    const state = {
        labels: ["January","February","March","April","May","June","July","August","September","October","November","December"],
        datasets: [
            {
                label:"Profits",
                backgroundColor: "rgba(75,192,192,1)",
                borderColor:"rgba(0,0,0,1)",
                borderWidth:2,
                data: [120,240,150,130,90,280,300,320,270,150,200,140]

            },
            {
                label:"Costs",
                backgroundColor: "orange",
                borderColor:"rgba(0,0,0,1)",
                borderWidth:2,
                data: [120,240,150,130,90,280,300,320,270,150,200,140]

            }
        ]
    }

    function generatePDF() {
        // Use html2canvas to capture the component as an image
        html2canvas(componentRef.current).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
      
          // Create new document in jsPDF
          const doc = new jsPDF('p', 'mm');
      
          // Add image to pdf
          doc.addImage(imgData, 'PNG', 10, 10, 180, 0);
      
          // Save pdf document
          doc.save('Generated.pdf');
        });
      };

      function calculate(){
        let val1 = parseFloat(document.getElementById("bill").value) ;
        let val2 = parseFloat(document.getElementById("empsal").value) ;
        let val3 = parseFloat(document.getElementById("trans").value) ;
        let val4 = parseFloat(document.getElementById("retail").value) ;

        let total = val4 - (val1+val2+val3);

        let profit = total*0.25;

        document.getElementById("profit").value = profit;
        document.getElementById("total").value = total;
      }

      function fillAmounts(){
        document.getElementById("bill").value = "101000";
        document.getElementById("empsal").value = "475000";
        document.getElementById("trans").value = "133600";
        document.getElementById("retail").value = "2505400";
        //document.getElementById("total").value="15000";
      };

    return(
        <div>
            <Header/>
            <div ref={componentRef} className="container">
                <div className="div2PDF" >
                    <div className="form-group" style={{ marginBottom: '15px' }} > 
                        <div className="shadowBox" style={{
                            boxShadow: "0 0 10px 0 white",
                            padding: "20px",
                            borderRadius: "10px",
                            backgroundColor: "#F5F5F5",
                            outline: "2px solid blue"
                        }}>
                            <br/>
                            <h3>Profit Calculations</h3>
                            <br/>
                            
                            <br/>
                            <label style={{ marginBottom: '5px',fontWeight:'bold' }}>Total Bill Amount:(RS)</label>
                            <input id="bill" className="form-control"/>
                            <label style={{ marginBottom: '5px',fontWeight:'bold' }}>Total Employee Salary:(Rs)</label>
                            <input id="empsal" className="form-control"/>
                            <label style={{ marginBottom: '5px',fontWeight:'bold' }}>Total Transportation Cost:(Rs)</label>
                            <input id="trans" className="form-control"/>
                            <label style={{ marginBottom: '5px',fontWeight:'bold' }}>Total Retail:(Rs)</label>
                            <input id="retail" className="form-control"/>
                            <label style={{ marginBottom: '5px',fontWeight:'bold',color:"green" }}>Total Amount:(Rs)</label>
                            <input id="total" className="form-control" disabled/>
                            <br></br>
                            <button type="submit" class="btn-update btn btn-primary" style={{background: 'linear-gradient(#F7971E,#FFD200)',width:'150px'}}
                            onClick={() => calculate()}>Calculate</button>
                            <button type="button" class="btn-update btn btn-secondary" style={{background: 'linear-gradient(#F7971E,#FFD200)',width:'150px'}}
                            onClick={() => fillAmounts()}>Ready</button>
                            
                            <br></br>
                            <br></br>
                            <label style={{ marginBottom: '5px',fontWeight:'bold' }}>Monthly Profit:(Rs)</label>
                            <input type="text" id="profit" disabled></input> 
                            
                        </div>
                    </div>
                </div>

                <form className="shadowBox" style={{
                    boxShadow: "0 0 10px 0 white",
                    padding: "20px",
                    borderRadius: "10px",
                    backgroundColor: "#F5F5F5",
                    outline: "2px solid blue"
                }}>
                        <br/>
                        <h3>Monthly Profits</h3>
                        <br/>
                        <div className="input-flex" style={{width:'100%'}}>
                        <div style={{width:'50%',float:'left'}} className="shadowBox">
                        <div>
                        <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter January Profits:</label>
                    <input className="form-control" type="number" name="jan" placeholder="$January Profit"
                        //onChange={(e) => this.handleChange(e)} 
                        //value={this.state.jan}
                        />
                        </div>
                        <div>
                        <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter February Profits:</label>
                    <input className="form-control" type="number" name="feb" placeholder="$February Profit"
                        //onChange={(e) => this.handleChange(e)}
                        //value={this.state.feb}
                        />
                        </div>
                        <div>
                        <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter March Profits:</label>
                    <input className="form-control" type="number" name="march" placeholder="$March Profit"
                        //onChange={(e) => this.handleChange(e)}
                        //value={this.state.march}
                        />
                        </div>
                        <div>
                        <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter April Profits:</label>
                    <input className="form-control" type="number" name="april" placeholder="$April Profit"
                        //onChange={(e) => this.handleChange(e)}
                        //value={this.state.april}
                        />
                        </div>
                        <div>
                        <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter May Profits:</label>
                        <input className="form-control" type="number" name="may" placeholder="$May Profit"
                        //onChange={(e) => this.handleChange(e)}
                        //value={this.state.may}
                        />
                        </div>
                        <div>
                        <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter June Profits:</label>
                    <input className="form-control" type="number" name="jun" placeholder="$June Profit"
                    // onChange={(e) => this.handleChange(e)}
                        //value={this.state.jun}
                        />
                        </div>
                        </div>
                        <div  style={{width:'50%',float:'right'}} className="shadowBox">
                        <div>
                        <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter July Profits:</label>
                    <input className="form-control" type="number" name="jul" placeholder="$July Profit"
                        //onChange={(e) => this.handleChange(e)}
                        //value={this.state.jul}
                        />
                        </div>
                        <div>
                        <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter August Profits:</label>
                    <input className="form-control" type="number" name="aug" placeholder="$August Profit"
                        //onChange={(e) => this.handleChange(e)}
                        //value={this.state.aug}
                        />
                        </div>
                        <div>
                        <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter September Profits:</label>
                        <input className="form-control" type="number" name="sep" placeholder="$September Profit"
                        //onChange={(e) => this.handleChange(e)}
                        //value={this.state.sep}
                        />
                        </div>
                        <div>
                        <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter October Profits:</label>
                    <input className="form-control" type="number" name="oct" placeholder="$October Profit"
                        //onChange={(e) => this.handleChange(e)}
                        //value={this.state.oct}
                        />
                        </div>
                        <div>
                        <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter November Profits:</label>
                    <input className="form-control" type="number" name="nov" placeholder="$November Profit"
                        //onChange={(e) => this.handleChange(e)}
                        //value={this.state.nov}
                        />
                    </div>
                    <div>
                    <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter December Profits:</label>
                    <input className="form-control" type="number"  name="dec" placeholder="$December Profit"
                        //onChange={(e) => this.handleChange(e)}
                        //value={this.state.dec}
                        />
                    </div>
                    </div>
                    </div>
                    <br></br>
                    <button type="submit" className="btn btn-success" ><i className="far fa-save"></i>&nbsp;Save</button>&nbsp;&nbsp;
                    <button /*onClick={this.monthlyProfit}*/>Profit</button>
                </form>

                <br/>

                <div className="chart">
                    <br/>
                    <h3>Bar Chart</h3>
                    <Bar
                        data={state}
                        //options={options}
                        >

                    </Bar>
                </div>

                <br/><br/>

                <button type="submit" class="btn-update btn btn-primary" style={{background: 'linear-gradient(#F7971E,#FFD200)',width:'180px'}} 
                onClick={() => generatePDF()}><i class="fa-solid fa-print"></i> Download Report</button>

                <Link className ="btn-back btn btn-primary" style={{background: 'linear-gradient(royalblue,tomato)',width:'80px',float:'right'}} to={"/financeDashboard"}>
                <i class="fa-solid fa-backward"></i>&nbsp;Back
                </Link>
            </div>
            <Footer/>
        </div>

        
    )
}