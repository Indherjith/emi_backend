const {JobModel} = require("../Models/Job.model");

const getJobs = async(req,res)=>{
    try{
        const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 10;
		const search = req.query.search || "";
        let sort = req.query.sort || "postedAt";
        
        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

        const sortBy={};
        if(sort[1]){
            sortBy[sort[0]] = sort[1];
        }else{
            sortBy[sort[0]]="desc";
        }

        const job = await (await JobModel.find({ postedAt: { $regex: search, $options: "i" } }).limit(limit).skip(page*limit).sort(sortBy));
        
        const response = {
            job,
            page:page + 1,
            limit
        }

		res.status(200).send(response);
	} catch (err) {
		console.log(err);
		res.status(500).send("Internal Server Error");
	}
}

const searchParticular = async (req,res) =>{
    const searchResult = await JobModel.find(req.body);
    try{
        res.status(200).send(searchResult);
    } catch(err){
        res.status(404).send(err);
    }
    // res.send(post_res);
}

module.exports = {getJobs,searchParticular}