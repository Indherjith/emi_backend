const express = require("express");
let jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { connection } = require("./config/db");
const { UserModel } = require("./models/User.model");
// const {authentication} = require("./middlewares/authentication")
// const {authorization} = require("./middlewares/authorization")

const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("welcome")
})

app.post("/signup",async (req,res)=>{
    let {email,password,name}=req.body;
    console.log(email,password,name)
    bcrypt.hash(password,6).then(async function(hash){
        const user = new UserModel({email,password:hash,name})
        await user.save()
        res.send("Sign up Successfull")
    })
    .catch(()=>{
        res.send("something went wrong")
    })
})

app.post("/login",async (req,res)=>{
    let {email,password} = req.body;
    let user = await UserModel.findOne({email})
    let hash = user.password;
    bcrypt.compare(password,hash,function(err,result){
        if(result){
            var token = jwt.sign({email:email},'secret');
            console.log(token);
            res.send({"msg":"Login Successfull","token":token})
        }
        else{
            res.send("Login failed, invalid credentials")
        }
    })
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