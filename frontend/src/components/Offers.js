import React from "react";

import chicken from '../images/chicken.jpg';
import vegetable from '../images/vegetable.jpg';
import cheese from '../images/cheese.jpg';
import seafood from '../images/seafood.jpg';
import Header from "./Header";
import Footer from './Footer';


const Offers = () => {
    return (

        <div>
          <Header/>
        <p1>Today Special</p1>
        <h1> 5% Discount for all Pizza</h1>
        
      <div class="container">
        <div class="pizza-item">
            <img src={chicken} alt="Pizza 1"></img>
            <h3>Chicken Pizza</h3>
            <p>3000.00</p>
            <p>Discounted Price :3000*5/100</p>
        </div>
        <div class="pizza-item">
            <img src={cheese} alt="Pizza 2"></img>
            <h3>Cheese Pizza</h3>
            <p>2850.00</p>
        </div>
        <div class="pizza-item">
            <img src={vegetable} alt="Pizza 3"></img>
            <h3>Vegetable Pizza</h3>
            <p>2200.00</p>
        </div>
        <div class="pizza-item">
            <img src={seafood} alt="Pizza 4"></img>
            <h3>Sea Food Pizza</h3>
            <p>3500.00</p>
        </div>
    </div>
    <Footer/>
    </div>
      
    );
  };
  
  export default Offers;
