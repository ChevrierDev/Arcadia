const express = require("express");
const serviceRouter = express.Router();
const { fetchServicesData } = require('../../utils/apiClient');

const decodeData = require("../../utils/decodeData");

// Route to render the services page
serviceRouter.get("/", async (req, res) => {
  const services = await fetchServicesData();
  const decodedService = decodeData(services)
  res.render("layouts/services", {
    title: "Découvrez tous nos services.",
    services: decodedService
  });
});

module.exports = serviceRouter;
