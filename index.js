const express = require("express");
const cors = require('cors');

const { connection } = require("./config/db");
const { ItemModel } = require("./Models/shop.model");
const { BookmarkModel } = require("./Models/bookmark.model");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/",async(req,res)=>{
    let Items = await ItemModel.find();
    res.send(Items)
})

app.post("/addItem",async(req,res)=>{
    var today = new Date();
    const {Title,Quantity,Priority,Description} = req.body;
    const date= today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const DateTimestamp = date+' ['+time+']';
    const item = new ItemModel({Title,Quantity,Priority,DateTimestamp,Description})
    await item.save()
    res.send("Item Added Successfully");
})

app.delete("/delete",async(req,res)=>{
    let Items = await ItemModel.deleteOne(req.query)
    res.send("Item Deleted Successfully")
})

app.get("/bookmark",async(req,res)=>{
    let Items = await BookmarkModel.find();
    res.send(Items)
})

app.post("/addBookmark",async(req,res)=>{
    let Item = await ItemModel.find({_id:req.query._id});
    const {Title,Quantity,Priority,DateTimestamp,Description} = Item[0];
    let bookmark = await BookmarkModel.find({Title,Quantity,Priority,DateTimestamp,Description});
    console.log(Item,bookmark)
    if(bookmark==[]){
        res.send("Item Already in Bookmark")
    }
    else{
        const item = new BookmarkModel({Title,Quantity,Priority,DateTimestamp,Description})
        console.log(item)
        await item.save()
        res.send("Item Added to Bookmark")
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