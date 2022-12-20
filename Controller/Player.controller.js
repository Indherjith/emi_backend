const {PlayerModel} = require("../Models/Player.model")

const getPlayer = async(req,res)=>{
    try{
        const players = await PlayerModel.find().sort({"score":-1}) ;
        res.send(players);
	} catch (err) {
		console.log(err);
		res.status(500).send("Internal Server Error");
	}
}

const addPlayer = async(req,res) =>{
	try{
		const {name,difficulty,score} = req.body;
		const already = await PlayerModel.find({name});
		if(already.length>0){
			console.log("error Occured");
			res.status(500).send("User Already Exist")
		}
		else{
			const player = new PlayerModel({name,difficulty,score})
			await player.save();
			res.send("Player Added Successfully")
		}
		
	}
	catch(err){
		console.log(err);
		res.status(500).send("Internal Server Error")
	}
}

module.exports = {getPlayer,addPlayer}