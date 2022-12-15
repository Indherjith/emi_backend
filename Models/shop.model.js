const mongoose = require("mongoose");
const itemSchema =new mongoose.Schema({
    Title:String,
    Quantity:String,
    Priority:String,
    DateTimestamp:String,
    Description:String,
})

const ItemModel = mongoose.model("item",itemSchema)
module.exports = {ItemModel}