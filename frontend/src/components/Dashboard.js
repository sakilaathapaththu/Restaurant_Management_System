import React from "react";
import { ProgressBar } from 'react-bootstrap';
import { Dropdown, Tabs, Tab } from 'react-bootstrap';
//import {Line, Bar} from 'react-chartjs-2';
import {CircularProgressbarWithChildren} from 'react-circular-progressbar';
//import logo from '../images/bb.jpeg';

function Dashboard(){
    return(
<div>
        
        <div>
          <div className="d-sm-flex justify-content-between align-items-start">
            <h2 className="text-dark font-weight-bold mb-2"> Overview dashboard </h2>
            <div className="d-sm-flex justify-content-xl-between align-items-center mb-2">
              </div>
             </div>
             <div className="row">
            <div className="col-md-12">
              <div className="justify-content-between align-items-center tab-transparent">
                <Tabs defaultActiveKey="Business" className="nav">
                  
                    <Tab eventKey="Business" title="Business">
                      <div>
                        <div className="row">

                        <div className="col-xl-3  col-lg-6 col-sm-6 grid-margin stretch-card">
                            <div className="card">
                              <div className="card-body text-center">
                              <a class="nav-link" href="/dashboard"><h5 className="mb-2 text-dark font-weight-normal">Dashboard</h5></a>
                               
                                </div>
                              </div>
                            </div>

                          <div className="col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card">
                            <div className="card">
                              <div className="card-body text-center">
                                <h5 className="mb-2 text-dark font-weight-normal">Users</h5>
                              
                                
                                
                              </div>
                            </div>
                          </div>

                          <div className="col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card">
                            <div className="card">
                              <div className="card-body text-center">
                                <h5 className="mb-2 text-dark font-weight-normal">Staff</h5>
                            </div>
                            </div>
                          </div>


                          <div className="col-xl-3  col-lg-6 col-sm-6 grid-margin stretch-card">
                            <div className="card">
                              <div className="card-body text-center">
                                <h5 className="mb-2 text-dark font-weight-normal">Oders</h5>
                               
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-3  col-lg-6 col-sm-6 grid-margin stretch-card">
                            <div className="card">
                              <div className="card-body text-center">
                                <h5 className="mb-2 text-dark font-weight-normal">Transport</h5>
                               
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-3  col-lg-6 col-sm-6 grid-margin stretch-card">
                            <div className="card">
                              <div className="card-body text-center">
                                <h5 className="mb-2 text-dark font-weight-normal">Reservation</h5>
                               
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-3  col-lg-6 col-sm-6 grid-margin stretch-card">
                            <div className="card">
                              <div className="card-body text-center">
                              <a class="nav-link" href="/view">  <h5 className="mb-2 text-dark font-weight-normal">Inventory</h5></a>
                               
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-3  col-lg-6 col-sm-6 grid-margin stretch-card">
                            <div className="card">
                              <div className="card-body text-center">
                                <h5 className="mb-2 text-dark font-weight-normal">Finance</h5>
                               
                                </div>
                              </div>
                            </div>




                          </div>
                        </div>
                      </Tab>
                    
                    
                    
                    </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    )

}
export default Dashboard;