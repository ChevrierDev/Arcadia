const express = require("express");
const savannahRouter = express.Router();


savannahRouter.get("/", (req, res) => {
  res.render("layouts/savannah", {
    title: "Découvrez Savannah Sanctuary.",
  });
});

module.exports = savannahRouter;
