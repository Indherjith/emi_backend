const express = require("express");
const cors = require('cors');
const axios = require('axios')
const { connection } = require("./config/db")

const app = express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("welcome")
})

app.get("/quiz", async(req,res)=>{
    const params = req.query;
    console.log(params)
    let data={};
    try{
        axios
        .get("https://opentdb.com/api.php", {params})
        .then((r)=>res.send(r.data.results))
        .catch((e)=>res.status(500).send("Internal error"))
    }
    catch(err){
        res.status(500).send("Internal Error Occurs")
    }
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