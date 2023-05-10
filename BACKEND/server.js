//dotenv configuration
require("dotenv").config();

//Import packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static('images'));

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser:true,
})

const connection = mongoose.connection;

const financeRouter = require("./routes/finances.js");
const CutomerRouter = require("./routes/customers.js");
const tableRouter = require("./routes/tables.js");
const employeeRouter = require("./routes/employees.js");
const inventoryRouter = require("./routes/inventories.js");
const orderRouter = require("./routes/orders.js");
const distributionRouter = require("./routes/distributions.js");
const dailyDetailRouter = require("./routes/dailydetails.js")
const userRoutes = require("./routes/Users");
const authRoutes = require("./routes/auth");


app.use("/finances", financeRouter);
app.use("/customers", CutomerRouter);
app.use("/tables",tableRouter);
app.use("/employees", employeeRouter);
app.use("/inventories",inventoryRouter);
app.use("/orders", orderRouter);
app.use("/distributions", distributionRouter);
app.use("/dailydetail",dailyDetailRouter);
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes)

app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`);
})

connection.once("open", () => {
    console.log("Connected to MONGODB database successfully!");
})