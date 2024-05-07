const express = require("express");
const serviceAPIRouter = express.Router();
const {
  getServices,
  getServicesByID,
  postServices,
  updateServices,
  deleteServices,
} = require("../../../controllers/services/services.controllers");
const  { serviceRules, validateService } = require('../../../middlewares/serviceValidator');
const upload = require("../../../utils/multer.config");


serviceAPIRouter.get("/", getServices);
serviceAPIRouter.get("/:id", getServicesByID);
serviceAPIRouter.post("/", serviceRules(), validateService, upload.single('images'),  postServices);
serviceAPIRouter.put("/:id",serviceRules(), validateService, upload.single('images'), updateServices);
serviceAPIRouter.delete("/:id", deleteServices);

module.exports = serviceAPIRouter;
