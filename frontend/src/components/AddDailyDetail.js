import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from './Footer';

export default function AddDailyDetail() {
  const [ID, setID] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [otSalary, setOTSalary] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setStartTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setEndTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function sendFirstFields(e) {
    e.preventDefault();

    // Check if ID and startTime are filled in
    if (ID && startTime && otSalary) {
      const newStudent = {
        ID,
        startTime,
        otSalary
      };

      axios
        .post("http://localhost:8070/dailydetail/addDaily", newStudent)
        .then(() => {
          alert("Reporting fields submitted");

          setID("");
          setStartTime("");
          setOTSalary("");
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  
  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  useEffect(() => {
    setOTSalary(getCurrentDate()); // Update the current date each time the component is rendered
  }, []);

  function sendLastFields(e) {
    e.preventDefault();
    

    const newStudent = {
      ID,
      endTime,
      otSalary,
      salary
    };

    axios
      .post("http://localhost:8070/dailydetail/addDaily", newStudent)
      .then(() => {
        alert("Leaving fields submitted");

        setID("");

        setEndTime("");
        setOTSalary("");
        setSalary("");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div>
      <Header/>
      <div className="container" style={{
                    boxShadow: "0 0 10px 0 white",
                    padding: "20px",
                    borderRadius: "10px",
                    backgroundColor: "#F5F5F5",
                    outline: "2px solid blue"
                }}>
       <h1 style={{color:"#00BFFF"}}>Attendance Form</h1>
      <form>
      <label for="inputPaymentDate"> Date : </label>
      <input type="date" id="otSalary" name="otSalary" value={otSalary} max={otSalary}  min={otSalary} onChange={(event) => setOTSalary(event.target.value)} required />

        <div className="form-group">
          <label htmlFor="name">Employee ID:</label>
          <input
            type="text"
            className="form-control"
            id="ID"
            placeholder="Enter Student Name"
            onChange={(e) => {
              setID(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Reporting Time:</label>
          <input
            type="text"
            className="form-control"
            id="startTime"
            value={startTime}
            readOnly // prevent users from modifying the generated value
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={sendFirstFields}>
          Submit Report Data
        </button>
      </form>
      <form>

      <label for="inputPaymentDate"> Date : </label>
      <input type="date" id="otSalary" name="otSalary" value={otSalary} max={otSalary}  min={otSalary} onChange={(event) => setOTSalary(event.target.value)} required />

      <div className="form-group">
          <label htmlFor="name">Employee ID:</label>
          <input
            type="text"
            className="form-control"
            id="ID"
            placeholder="Enter Student Name"
            onChange={(e) => {
              setID(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Leaving Time:</label>
          <input
            type="text"
            className="form-control"
            id="startTime"
            value={endTime}
            readOnly // prevent users from modifying the generated value
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">OT Salary:</label>
          <input
            type="number"
            className="form-control"
            id="salary"
            placeholder="Enter OT Salary"
            onChange={(e) => {
              setSalary(e.target.value);
            }}
          />
        </div>
       
       
        <button type="submit" className="btn btn-primary" onClick={sendLastFields}>
          Submit Leave Data
        </button>
        &nbsp;&nbsp;
        <Link className ="btn-back btn btn-primary" style={{background: 'linear-gradient(royalblue,tomato)',width:'250px'}} to={"/daily"}>
                    <i class="fa-solid fa-backward"></i>&nbsp;Attendance Dashboard
                    </Link>
                    &nbsp;&nbsp;
                    <Link className ="btn-back btn btn-primary" style={{background: 'linear-gradient(royalblue,tomato)',width:'80px'}} to={"/viewemployee"}>
                    <i class="fa-solid fa-backward"></i>&nbsp;Back
                    </Link>
      </form>
    </div>
    <Footer/>
    </div>
  );
}