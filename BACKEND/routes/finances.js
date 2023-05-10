const router = require("express").Router();

let finance = require("../models/finances");

//Add finance details
router.route("/add").post((req,res) => {
    const InvoiceID = req.body.InvoiceID;
    const BillName = req.body.BillName;
    const AccountNo = Number(req.body.AccountNo);
    const Amount = Number(req.body.Amount);
    const PaymentDate = req.body.PaymentDate;

    const newFinance = new finance({
        InvoiceID,
        BillName,
        AccountNo,
        Amount,
        PaymentDate
    })

    newFinance.save().then(() => {
        res.json("Finance report added successfully!");
    }).catch((error) => {
        console.log(error);
    })
})

//View Financial details
router.route("/financeDashboard").get((req,res) =>{
    finance.find().then((finances) => {
        res.json(finances);
    }).catch((error) => {
        console.log(error);
    })
})

//Update finance details
router.route("/update/:id").put(async(req,res) => {
    let financeID = req.params.id;

    const {InvoiceID,BillName,AccountNo,Amount,PaymentDate} = req.body;

    const updateFinance = {
        InvoiceID,
        BillName,
        AccountNo,
        Amount,
        PaymentDate
    }

    const update = await finance.findByIdAndUpdate(financeID,updateFinance).then(() => {
        res.status(200).send({status:"Finance updated"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message});
    })
})

//Delete finance details
router.route("/delete/:id").delete(async(req,res) => {
    let financeID = req.params.id;

    await finance.findByIdAndDelete(financeID).then(() => {
        res.status(200).send({status:"Finance deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status:"Error with deleting data",error:err.message});
    })
})

//View details of a single finance report
router.route("/get/:id").get(async(req,res) => {
    let financeID = req.params.id;

    try {
        const financeReport = await finance.findById(financeID);
        res.status(200).send({status:"finance report fetched", data: financeReport});
    } catch (err) {
        res.status(500).send({status:"Error with getting finance report", error: err.message});
    }
});

/*router.route("/finance/get/:id").get(async(req,res) => {
    let financeID = req.params.id;

    const financeReport = await finance.findById(financeID).then(() => {
        res.status(200).send({status:"finance report fetched",data: finance});
    }).catch((err) => {
        res.status(500).send({status:"Error with getting user",error:err.message});
    })
})*/

module.exports = router;