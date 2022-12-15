const mongoose = require("mongoose");
const bookmarkSchema =new mongoose.Schema({
    Title:String,
    Quantity:String,
    Priority:String,
    DateTimestamp:String,
    Description:String,
})

const BookmarkModel = mongoose.model("bookmark",bookmarkSchema)
module.exports = {BookmarkModel}