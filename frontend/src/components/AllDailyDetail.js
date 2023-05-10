import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteDetails from './DeleteDailyDetail';
import DeleteDailyDetail from './DeleteDailyDetail';
import Header from "../components/Header";
import Footer from '../components/Footer';

export default function AllDailyDetail() {
  const [students, setStudents] = useState([]);
  const [employeeID, setEmployeeID] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [otHours, setOtHours] = useState(0);
  const [otSalary, setOtSalary] = useState(0);
  const [position, setPosition] = useState("");
  const [filter, setFilter] = useState("");
  const [searchID, setSearchID] = useState("");
  const [showForm, setShowForm] = useState(false); // add state for showing/hiding form
  const [value, setValue] = useState(0);
  const [salaries, setSalaries] = useState([]);
  const [totalSalary, setTotalSalary] = useState(0);


  useEffect(() => {
    getEmployees();
  }, []);

  function getEmployees() {
    axios.get("http://localhost:8070/dailydetail/daily").then((res) => {
      console.log(res.data);
      setStudents(res.data);
    }).catch((err) => {
      alert(err.message);
    })
  }

  


  
  function handleFilterChange(e) {
    setFilter(e.target.value);
  }

  const filteredStudents = students.filter((std) => {
    return std.ID.toLowerCase().includes(filter.toLowerCase());
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  function handleAddRecord(e) {
    e.preventDefault();
    const start = new Date(`2023-05-09T${startTime}`);
    const end = new Date(`2023-05-09T${endTime}`);
    const diffInMs = end - start;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const ot = diffInHours > 8 ? diffInHours - 8 : 0;
    setOtHours(ot.toFixed(2));
    // calculate OT salary based on position and OT hours
    let hourlyRate;
    switch (position) {
      case 'Chef':
        hourlyRate = 50;
        break;
      case 'Receptionist':
        hourlyRate = 30;
        break;
      case 'Waiter':
        hourlyRate = 35;
        break;
      case 'Driver':
        hourlyRate = 25;
        break;
      case 'Cleaner':
        hourlyRate = 40;
        break;
      default:
        hourlyRate = 0;
    }
    const otSalaryValue = ot * hourlyRate * 1.5; // overtime rate is 1.5 times hourly rate
    setOtSalary(otSalaryValue.toFixed(2));

    const newSalary = Number(e.target.salary.value);
    setSalaries([...salaries, newSalary]);
    setTotalSalary(totalSalary + newSalary);
    e.target.reset();

   
  }

     
  

  return (
    <div>
      <Header/>
      <div className="page-content container">
      <h1>Attendance Dashboard</h1>
      <form onSubmit={handleSubmit}>
      <form class="d-flex justify-content-end" role="search">
        <input onChange={handleFilterChange} class="form-control me-2 w-auto" type="search" placeholder="Search" aria-label="Search"/>
        <button class="search-btn btn btn-outline-info" type="submit">Search</button>
      </form>
      </form>
      <table className="table border shadow table table-striped border" style={{fontWeight:'bold'}}>
        <thead>
          <tr>
          <th scope="col">#</th>
            <th scope="col"> Employee ID</th>
            <th scope="col">Start Time</th>
            <th scope="col">End Time</th>
            <th scope="col">Date</th>
            <th scope="col">OT Salary</th>
           
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((std,index) => {

            return(
            <tr key={index}>
            <th scope="row">{index+1}</th>
              <td>{std.ID}</td>
              <td>{std.startTime}</td>
              <td>{std.endTime}</td>
              <td>{std.otSalary}</td>
              <td>{std.salary}</td>
              <td/>

              <Link className ="btn btn-danger" to={"/deleteDaily/" + std._id} style={{paddingRight: '20px'}}>
                                    <i className="fas fa-trash-alt"></i>&nbsp;Delete
                                    </Link>
            </tr>
            );
             } )}
        </tbody>
      </table>
      <Link className ="btn-back btn btn-primary" style={{background: 'linear-gradient(royalblue,tomato)',width:'80px'}} to={"/addDaily"}>
                    <i class="fa-solid fa-backward"></i>&nbsp;Back
                    </Link>
                    &nbsp;&nbsp;
      <button  className ="btn-back btn btn-primary" style={{background: 'linear-gradient(royalblue,tomato)',width:'200px'}} onClick={() => setShowForm(true)}>Salary Calculation</button>
      {showForm && (
      
      <form onSubmit={handleAddRecord}>
      <div className='form-group'>
        <label htmlFor="start-time">Start Time:</label>
        <input
        className='form-control'
          type="time"
          id="start-time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="end-time">End Time:</label>
        <input
        className='form-control'
          type="time"
          id="end-time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="position">Position:</label>
        <select id="position" value={position} onChange={(e) => setPosition(e.target.value)}>
          <option value="">Select a position</option>
          <option value="Chef">Chef</option>
          <option value="Waiter">Waiter</option>
          <option value="Driver">Driver</option>
          <option value="Receptionist">Receptionist</option>
          <option value="Cleaner">Cleaner</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="ot-hours">OT Hours:</label>
        <input className='form-control' type="text" id="ot-hours" value={otHours} readOnly />
      </div>
      <div>
        <label htmlFor="ot-salary">OT Salary:</label>
        <input className='form-control' type="text" id="ot-salary" value={otSalary} readOnly />
      </div>

     
      <button className ="btn-back btn btn-primary" style={{background: 'linear-gradient(royalblue,tomato)',width:'250px'}} type="submit">Calculate OT Hours and Salary</button>
      <div>
        <h3>Ater 30 days Salary calculation</h3>
      
      
        <label>Enter Salary:</label>
        <input className='form-control' type="number" name="salary" />
        <button className ="btn-back btn btn-primary" style={{background: 'linear-gradient(royalblue,tomato)',width:'200px'}} type="submit">Add Salary</button>
      
      <div>
        <h5>Total Salary: {totalSalary}</h5>
        <ul>
          {salaries.map((salary, index) => (
            <li key={index}>{salary}</li>
          ))}
        </ul>
      </div>
    </div>
    </form>



        
      )}
    </div>
    <Footer/>
    </div>
  );
} 

