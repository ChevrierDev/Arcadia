const express = require("express");
const serviceApiRouter = express.Router();
const {
  getServices,
  getServicesByID,
  postServices,
  updateServices,
  deleteServices,
} = require("../../../controllers/services/services.controllers");
const  { serviceRules, validateService } = require('../../../middlewares/serviceValidator');
const upload = require("../../../utils/multer.config");


serviceApiRouter.get("/", getServices);
serviceApiRouter.get("/:id", getServicesByID);
serviceApiRouter.post("/", serviceRules(), validateService, upload.single('images'),  postServices);
serviceApiRouter.put("/:id",serviceRules(), validateService, upload.single('images'), updateServices);
serviceApiRouter.delete("/:id", deleteServices);

module.exports = serviceApiRouter;
