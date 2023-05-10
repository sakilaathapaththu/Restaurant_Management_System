import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Header from "./components/Header";
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

//Finance
import AllFinances from './components/AllFinance';
import AddFinance from './components/AddFinance';
import UpdateFinance from './components/UpdateFinance';
import Calculation from './components/FinanceCalculations';

//Customer
import AddCustomer from './components/AddCustomer';
import AllCustomers from './components/AllCustomers';
import DeleteCustomer from './components/DeleteCustomer';
import UpdateCustomer from './components/UpdateCustomer';
import Offers from './components/Offers';
import FoodPage from './components/FoodPage';

//Reservation
import Inserttables from './components/addtables';
import Table from './components/tableview';
import Body from './components/body';
import Reserveation from './components/reservation';
import UpdateTable from './components/updatetable';
import DeleteTables from './components/deletetable';
import Cards from './components/ReservationCrient/Cards';

//Employees
import AllEmployees from './components/AllEmployees';
import AddEmployee from './components/AddEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import AddDailyDetail from './components/AddDailyDetail';
import AllDailyDetail from './components/AllDailyDetail';
import DeleteDetails from './components/DeleteDailyDetail';

//Inventories
import Insertitem from './components/addItem';
import Stock from './components/stockview';
//import EditItem from './components/EditItem';
import Dashboard from './components/Dashboard';
import Updateitem from './components/Updateitem';

//Orders
import AddOrder from './components/AddOrder';
import AllOrders from './components/AllOrders';
import UpdateOrder from './components/UpdateOrder';
import DeleteOrder from './components/DeleteOrder';

//Distribution
import AddDistribution from './components/AddDistribution';
import AllDistribution from './components/AllDistribution';
import DeleteDistribution from './components/DeleteDistribution';
import UpdateDistribution from './components/UpdateDistribution';

function App() {
  return (
    <Router>
        <div>
          
          <Routes>

            <Route path="/home" element={<Home/>}/>
            <Route path="/" element={<Login/>}/>
            <Route path="/Register" element={<Register/>}/>
            
            {/*Finance Routes*/}
            <Route path="/addFinance" element={<AddFinance/>}/>
            <Route path="/financeDashboard" element={<AllFinances/>}/>
            <Route path="/updateFinance/:id" element={<UpdateFinance/>}/>
            <Route path="/FinanceCalculations" element={<Calculation/>}/>

            {/*Customer*/ }
            <Route path="/addcustomer" element={<AddCustomer/>}/>
            <Route path="/deletecustomer/:id" element={<DeleteCustomer/>}/>
            <Route path="/updatecustomer/:id" element={<UpdateCustomer/>}/>
            <Route path="/viewcustomers" element={<AllCustomers/>}/>
            <Route path="/Offers" element={<Offers/>}/>
            <Route path="/fooddiscount" element={<FoodPage/>}/>

            {/*Reservation*/ }
            <Route path='/add' element={<Inserttables/>} />
            <Route path='/view' element={<Table/>} />
            <Route path='/home' element={<Body/>} />
            <Route path='/common_view' element={<Reserveation/>} />
            <Route path="/update/:id" element={<UpdateTable/>}></Route>
            <Route path='/delete/:id' element={<DeleteTables/>} />
            <Route path="/reservationClient" element={<Cards/>}></Route>

            {/*Employees */}
            <Route path="/viewemployee" element={<AllEmployees/>}/>
            <Route path="/updateemployee/:id" element={<UpdateEmployee/>}/>
            <Route path="/addemployee" element={<AddEmployee/>}/>
            <Route path="/daily" element={<AllDailyDetail/>}/>
            <Route path="/addDaily" element={<AddDailyDetail/>}/>
            <Route path="/deleteDaily" element={<DeleteDetails/>}/>

            {/*Inventories*/}
            <Route path='/addinventory' element={<Insertitem/>} />
            <Route path='/viewinventory' element={<Stock/>}/>
            <Route path='/inventoryedit/:id' element={<Updateitem/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>

            {/*Orders */}
            <Route path="/allOrders" element={<AllOrders/>}/>
            <Route path="/addOrder" element={<AddOrder/>}/>
            <Route path="/updateOrder/:id" element={<UpdateOrder/>}/>
            <Route path="/deleteOrder/:id" element={<DeleteOrder/>}/>

            {/*Distribution */}
            <Route path="/allDistribution" element={<AllDistribution/>}/>
            <Route path="/addDistribution" element={<AddDistribution/>}/>
            <Route path="/updateDistribution/:id" element={<UpdateDistribution/>}/>
            <Route path="/deleteDistribution/:id" element={<DeleteDistribution/>}/>
            
            
          </Routes>
          
          
		  
        </div>
      </Router>
  );
}

export default App;
