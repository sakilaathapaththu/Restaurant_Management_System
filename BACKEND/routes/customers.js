const router = require("express").Router();

let customer = require("../models/customers");

//Add customer details
router.route("/add").post((req,res) => {
    const RegNo = req.body.RegNo;
    const Name = req.body.Name;
    const Email = req.body.Email;
    const Address = req.body.Address;
    const Phone = req.body.Phone;

    const newCustomer = new customer({
       RegNo,
       Name,
       Email,
       Address,
       Phone
    })

    newCustomer.save().then(() => {
        res.json("cUSTOMER added successfully!");
    }).catch((error) => {
        console.log(error);
    })
})

//View customer details
router.route("/customers").get((req,res) =>{
    customer.find().then((customers) => {
        res.json(customers);
    }).catch((error) => {
        console.log(error);
    })
})

//Update customer details
router.route("/update/:id").put(async(req,res) => {
    let customerID = req.params.id;

    const {RegNo,Name,Email,Address,Phone} = req.body;

    const updateCustomer = {
        RegNo,
        Name,
        Email,
        Address,
        Phone
    }

    const update = await customer.findByIdAndUpdate(customerID,updateCustomer).then(() => {
        res.status(200).send({status:"Customer details updated"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message});
    })
})

//Delete customer details
router.route("/delete/:id").delete(async(req,res) => {
    let customerID = req.params.id;

    await customer.findByIdAndDelete(customerID).then(() => {
        res.status(200).send({status:"Customer deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status:"Error with deleting data",error:err.message});
    })
})



//Delete customer details
router.route("/delete/:id").delete(async(req,res) => {
    let customerID = req.params.id;

    await customer.findByIdAndDelete(customerID).then(() => {
        res.status(200).send({status:"Customer deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status:"Error with deleting data",error:err.message});
    })
})

//View details of a single customer report
router.route("/get/:id").get(async(req,res)=>{
    let cusID = req.params.id;
    const user = await customer.findById(cusID).then((customer)=>{
        res.status(200).send({ status:"Customer fetched",customer})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({ status: "Error with get user",error:err.message });
    })
})


module.exports = router;