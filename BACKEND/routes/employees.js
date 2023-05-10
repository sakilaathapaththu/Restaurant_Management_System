const router =  require("express").Router();
let Employee = require("../models/Employee");

const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter })


router.route("/add").post(upload.single("filepath"),(req,res)=>{

    const ID = req.body.ID;
    const name = req.body.name;
    const filepath = req.file.filename;
    const contact = Number( req.body.contact);
    const designation = req.body.designation;
    const join = req.body.join;

    const newEmployee = new Employee({
        ID,
        name,
        filepath,     
        contact,
        designation,
        join
        
    })

    console.log(req.file)

    newEmployee.save().then(()=>{
        res.json("Employee Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{

   Employee.find().then((employees)=>{
        res.json(employees)
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/update/:id").put(async (req,res) =>{
    let userId = req.params.id;
    const{ID,name, filepath,contact,designation,join} = req.body;

    const updateEmployee = {
        ID,
        name,
        filepath,
        contact,
        designation,
        join
    }

    const update = await Employee.findByIdAndUpdate(userId,updateEmployee)
    .then(() =>{
        res.status(200).send ({status: "User updated"})

    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status: "Error with updatingh data"});
    })
})

router.route("/delete/:id").delete(async (req , res) => {
    let userId = req.params.id;

    await Employee.findByIdAndDelete(userId)
     .then(() =>{
        res.status(200).send({status:" User deleted "});
     }).catch ((err)=>{
        console.log(err.message);
        res.status(500).send({status: "error with delete user", error: err.message});
     })
})

router.route("/get/:id").get(async (req,res)=>{
    let userId = req.params.id;
    const user = await Employee.findById(userId)
    .then((employee) =>{
        res.status(200).send({status: "User fetched", employee})
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})

module.exports = router;

