const router =  require("express").Router();
let Distribution = require("../models/Distribution");

router.route("/add").post((req,res)=>{
    const Date = req.body.Date;
    const Dambulla = Number(req.body.Dambulla);
    const Matale = Number(req.body.Matale);
    const Kandy = Number(req.body.Kandy);
    const total = Number(req.body.total);
    const vehicleId = req.body.vehicleId;
    const drivername = req.body.drivername;
   
    const newDistribution = new Distribution({
        Date,
        Dambulla,
        Matale,
        Kandy,
        total,
        vehicleId,
        drivername
    })

    newDistribution.save().then(()=>{
        res.json("Distribution Details Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{

    Distribution.find().then((distributions)=>{
        res.json(distributions)
    }).catch((err)=>{
        console.log(err);
    })
})



router.route("/update/:id").put(async (req,res) =>{
    let userId = req.params.id;
    const{Date,Dambulla,Matale,Kandy,vehicleId,drivername} = req.body;

    const updateDistribution = {
        Date,
        Dambulla,
        Matale,
        Kandy,
        vehicleId,
        drivername
    }

    const update = await Distribution.findByIdAndUpdate(userId,updateDistribution)
    .then(() =>{
        res.status(200).send ({status: "Distribution Details updated"})

    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })
})



router.route("/delete/:id").delete(async (req , res) => {
    let userId = req.params.id;

   await Distribution.findByIdAndDelete(userId)
     .then(() =>{
        res.status(200).send({status:" Distribution Details deleted "});
     }).catch ((err)=>{
        console.log(err.messitemId);
        res.status(500).send({status: "error with distribution details", error: err.message});
     })
})

router.route("/get/:id").get(async (req,res)=>{
    let userId = req.params.id;


    try {
        const distributionReport = await distribution.findById(userID);
        res.status(200).send({status:"distribution report fetched", data: distributionReport});
    } catch (err) {
        res.status(500).send({status:"Error with getting distribution report", error: err.message});
    }
});

module.exports = router;

