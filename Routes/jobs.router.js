const { Router } = require("express");
const { getJobs,searchParticular } = require("../Controller/Job.controller")

const jobRouter = Router();

jobRouter.get("/",getJobs);
jobRouter.get("/filter",searchParticular);

module.exports={jobRouter};