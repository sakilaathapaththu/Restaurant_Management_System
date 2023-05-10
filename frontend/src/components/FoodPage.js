import React, { useState } from 'react';
import shopping from "../images/shopping.jpg";
import Header from "./Header";
import Footer from './Footer';

const FoodPage = () => {
  const [amount, setAmount] = useState(0);

  const calculateDiscountedPrice = () => {
    const discountedPrice = amount - amount * 0.05;
    return discountedPrice.toFixed(2);
  };

  return (
    <div>
      <Header/>
        <center>
      <h1><font color="red">Loyalty Card Discounts</font></h1>
     
      <h3> 5% discount for total bill for all loyalty customers</h3>
      </center>
      <img src={shopping} alt="Pizza "></img>
      <label><strong>
        Enter the amount of your total bill:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
      </strong></label>
      {amount > 0 && (
        <div><center>
          <h2>Discounted Price: {calculateDiscountedPrice()}</h2>
          </center>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default FoodPage;