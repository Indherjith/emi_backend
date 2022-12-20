const { Router } = require("express");
const { getPlayer,addPlayer } = require("../Controller/Player.controller")

const playerRoute = Router();

playerRoute.get("/",getPlayer);
playerRoute.post("/add",addPlayer)

module.exports={playerRoute};