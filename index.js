const express = require("express");
const cors = require('cors');

const { connection } = require("./config/db");
const { PlayerModel } = require("./Models/Player.model")
const { playerRoute } = require("./Routes/player.route")

const app = express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("welcome")
})

// app.get("/jobs",async(req,res)=>{
//     let Jobs = await JobModel.find();
//     res.send(Jobs)
// })

app.use("/players",playerRoute);



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