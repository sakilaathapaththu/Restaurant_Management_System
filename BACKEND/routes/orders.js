const router =  require("express").Router();
let Order = require("../models/Order");

router.route("/addOrder").post((req,res)=>{

    const itemCode = req.body.itemCode;
    const cusId = req.body.cusId;
    const cusName = req.body.cusName;
    const filepath = req.body.filepath;
    const itemType = req.body.itemType;
    const noOfItems = Number(req.body.noOfItems);
    const greeting = req.body.greeting;
    const orderDate = req.body.orderDate;
    const dueDate = req.body.dueDate;

    const newOrder = new Order({
        itemCode,
        cusId,
        cusName,
        filepath,
        itemType,
        noOfItems,
        greeting,
        orderDate,
        dueDate

    })

    newOrder.save().then(()=>{
        res.json("Order Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/allOrders").get((req,res)=>{

    Order.find().then((orders)=>{
        res.json(orders)
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/updateOrder/:id").put(async (req,res) =>{
    let userId = req.params.id;
    const{itemCode, cusId, cusName, filepath,itemType, noOfItems, greeting, orderDate, dueDate} = req.body;

    const updateOrder = {
        itemCode,
        cusId,
        cusName,
        filepath,
        itemType,
        noOfItems,
        greeting,
        orderDate,
        dueDate
    }

    const update = await Order.findByIdAndUpdate(userId,updateOrder)
    .then(() =>{
        res.status(200).send ({status: "Order updated"})

    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status: "Error with updatingh data"});
    })
})

router.route("/deleteOrder/:id").delete(async (req , res) => {
    let userId = req.params.id;

    await Order.findByIdAndDelete(userId)
     .then(() =>{
        res.status(200).send({status:" Order deleted "});
     }).catch ((err)=>{
        console.log(err.message);
        res.status(500).send({status: "error with delete order", error: err.message});
     })
})

router.route("/getOrder/:id").get(async (req,res)=>{
    let userId = req.params.id;
    const user = await Order.findById(userId)
    .then((order) =>{
        res.status(200).send({status: "Order fetched", order})
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with get order", error: err.message});
    })
})

module.exports = router;

