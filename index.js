const express = require("express");
const cors = require('cors');

const { connection } = require("./config/db");
const { ItemModel } = require("./Models/shop.model");
const { BookmarkModel } = require("./Models/bookmark.model");
const { JobModel } = require("./Models/Job.model");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("welcome")
})

app.get("/jobs",async(req,res)=>{
    let Jobs = await JobModel.find();
    res.send(Jobs)
})

app.post("/addJobs",async(req,res)=>{
    var today = new Date();
    const {company,city,location,role,level,contract,position,language} = req.body;
    const postedAt=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const job = new JobModel({company,postedAt,city,location,role,level,contract,position,language})
    await job.save()
    console.log(job)
    res.send("Job Posted Successfull")
})


app.listen(8080,async ()=>{
    try{
        await connection
        console.log("connected to DB successfully")
    }
    catch(err){
        console.log("err connection to db")
        console.log(err)
    }
    console.log("listing on PORT 8080")
})