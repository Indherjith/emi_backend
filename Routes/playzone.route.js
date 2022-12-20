const { Router }  = require("express");
const { isObjectIdOrHexString } = require("mongoose");
const { PlayerModel } = require("../Models/Player.model")

const playzoneRoute = Router();

playzoneRoute.post("/",async(req,res)=>{    
    const random = (length = 8) => {
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let str = '';
        for (let i = 0; i < length; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }    
        return str;    
    };
    let stats = req.body.difficulty;
    let str;
    if(stats == "Low"){
        str = random();
    }
    else if(stats == "Medium"){
        str = random(12);
    }
    else if(stats == "High"){
        str = random(16);
    }
    res.send(str)
})

module.exports = {playzoneRoute};