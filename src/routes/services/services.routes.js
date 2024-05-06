const express = require("express");
const serviceRouter = express.Router();
const {
  getServices,
  getServicesByID,
  postServices,
  updateServices,
  deleteServices,
} = require("../../controllers/services/services.controllers");
const  { serviceRules, validateService } = require('../../middlewares/serviceValidator');
const upload = require("../../utils/multer.config");

serviceRouter.get("/", (req, res) => {
  res.render("layouts/services", {
    title: "Découvrez tous nos services.",
  });
});

serviceRouter.get("/description", getServices);
serviceRouter.get("/:id", getServicesByID);
serviceRouter.post("/description", serviceRules(), validateService, upload.single('images'),  postServices);
serviceRouter.put("/description/:id",serviceRules(), validateService, upload.single('images'), updateServices);
serviceRouter.delete("/description/:id", deleteServices);

module.exports = serviceRouter;
