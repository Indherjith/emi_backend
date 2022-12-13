const express = require("express");
let jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const { connection } = require("./config/db");
const { UserModel } = require("./models/User.model");
const {authentication} = require("./middlewares/authentication")
// const {authorization} = require("./middlewares/authorization")

const app = express();
app.use(express.json());
app.use(cors());

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

app.get("/getProfile",authentication,async(req,res)=>{
    let user = await UserModel.findOne(req.body)
    res.send(user)
})

app.post("/calculateEMI",authentication,async(req,res)=>{
    let {loan_amount,annual_interest_rate,tenure_in_months} = req.body;
    console.log(loan_amount,annual_interest_rate,tenure_in_months);
    let p = loan_amount;
    let r = annual_interest_rate/12/100;
    let n = tenure_in_months;
    let E =(p*r*((1+r)^n))/(((1+r)^n)-1)
    console.log(p,r,n,E)
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