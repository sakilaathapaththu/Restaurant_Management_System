const router = require("express").Router();
//model import karagannawa

let inventory = require("../models/inventories");

router.route("/add").post((req,res)=>{

    const type = req.body.type;
    const name = req.body.name;
    const date = req.body.date;
    const quantity = Number(req.body.quantity);
    const unitprice = req.body.unitprice;
    const totalprice = Number(req.body.totalprice);

    const newInventory = new inventory({
        type,
        name,
        date,
        quantity,
        unitprice,
        totalprice
    })

    newInventory.save().then(()=>{
        res.json("Inventory added successfully")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/inventories").get((req,res)=>{
    inventory.find().then((posts)=>{
        res.json({ success: true, existingPosts: posts });
    }).catch((err)=>{
        console.log(err);
        res.json({ success: false, message: "Error retrieving inventory." });
    })
})


router.route("/update/:id").put(async (req,res) =>{
    let id = req.params.id;
    const {type,name,date,quantity,unitprice,totalprice} = req.body;

    const updateInventory = {
        type,
        name,
        date,
        quantity,
        unitprice,
        totalprice
    }

    const update = await inventory.findByIdAndUpdate(id,updateInventory)
    .then(() =>{
        res.status(200).send ({status: "Inventory updated"})

    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })
})


router.route("/delete/:id").delete(async (req , res) => {
    let id = req.params.id;

    await inventory.findByIdAndDelete(id)
     .then(() =>{
        res.status(200).send({status:" inventory deleted "});
     }).catch ((err)=>{
        console.log(err.message);
        res.status(500).send({status: "error with delete user", error: err.message});
     })
})

router.route("/post/:id").get(async (req,res)=>{
    let id = req.params.id;
    const inventories = await inventory.findById(id)
    .then((post) =>{
        res.status(200).send({status: "Table fetched", post})
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})


module.exports = router;
