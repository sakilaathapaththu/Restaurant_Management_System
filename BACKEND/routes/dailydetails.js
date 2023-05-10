const router =  require("express").Router();
let DailyDetail = require("../models/DailyDetail");

router.route("/addDaily").post((req,res)=>{
    const ID = req.body.ID;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const otSalary = req.body.otSalary;
    const salary = req.body.salary;


    const newDailyDetail = new DailyDetail({
        ID,
        startTime,
        endTime,
        otSalary,
        salary
    })

    newDailyDetail.save().then(()=>{
        res.json("Details Successfully Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/daily").get((req,res)=>{

   DailyDetail.find().then((dailydetails)=>{
        res.json(dailydetails)
    }).catch((err)=>{
        console.log(err);
    })
})

/*router.route("/updateDaily/:id").put(async (req,res) =>{
    let userId = req.params.id;
    const{ID,position, startTime,endTime,totalHours,ot} = req.body;

    const updateDailyDetails = {
        ID,
        position,
        startTime,
        endTime,
        totalHours,
        ot
    }

    const update = await DailyDetails.findByIdAndUpdate(userId,updateDailyDetails)
    .then(() =>{
        res.status(200).send ({status: "User updated"})

    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status: "Error with updatingh data"});
    })
})*/

router.route("/deleteDaily/:id").delete(async (req , res) => {
    let userId = req.params.id;

    await DailyDetail.findByIdAndDelete(userId)
     .then(() =>{
        res.status(200).send({status:" User deleted "});
     }).catch ((err)=>{
        console.log(err.message);
        res.status(500).send({status: "error with delete user", error: err.message});
     })
})

/*router.route("/getDaily/:id").get(async (req,res)=>{
    let userId = req.params.id;
    const user = await DailyDetails.findById(userId)
    .then((DailyDetails) =>{
        res.status(200).send({status: "User fetched", employee})
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})*/

module.exports = router;

