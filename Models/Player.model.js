const mongoose = require("mongoose");
const playerSchema =new mongoose.Schema({
    name:String,
    difficulty:String,
    score:Number
})

const PlayerModel = mongoose.model("player",playerSchema)
module.exports = {PlayerModel}