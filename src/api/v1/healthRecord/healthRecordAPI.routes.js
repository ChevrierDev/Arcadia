const express = require("express");
const healthRecordAPIRouter = express.Router();
const {
  getHealthRecords,
  getHealthRecordsByID,
  postHealthRecords,
  updateHealthRecords,
  deleteHealthRecords,
} = require("../../../controllers/healthRecord/healthRecord.controllers");
const  {   healthRecordRules, validatehealthRecord, } = require('../../../middlewares/healthRecordValidator');

healthRecordAPIRouter.get("/", getHealthRecords);
healthRecordAPIRouter.get("/:id", getHealthRecordsByID);
healthRecordAPIRouter.post("/", healthRecordRules(), validatehealthRecord, postHealthRecords);
healthRecordAPIRouter.put("/:id", healthRecordRules(), validatehealthRecord, updateHealthRecords);
healthRecordAPIRouter.delete("/:id", deleteHealthRecords);

module.exports = healthRecordAPIRouter;
