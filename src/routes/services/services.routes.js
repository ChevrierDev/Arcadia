const express = require("express");
const serviceRouter = express.Router();
const { fetchServicesData } = require('../../utils/apiClient');

// Route to render the services page
serviceRouter.get("/", async (req, res) => {
  const services = await fetchServicesData();
  res.render("layouts/services", {
    title: "Découvrez tous nos services.",
    services: services
  });
});

module.exports = serviceRouter;
