const express = require("express");
const serviceRouter = express.Router();
const { fetchServicesData } = require("../../utils/apiClient");
const db = require('../../config/db');

const decodeData = require("../../utils/decodeData");

// Route to render the services page
serviceRouter.get("/", async (req, res) => {
  try {
    const servicesQuery = `
      SELECT 
      service_id,
      name,
      description,
      images
      FROM
      service
    `;
    const { rows: services } = await db.query(servicesQuery);
    const decodedServices = decodeData(services);
    console.log(decodedServices)

    res.render("layouts/services", {
      title: "Découvrez tous nos services.",
      services: decodedServices,
    });
  } catch (err) {
    console.log(err);
    res.render("layouts/services", {
      title: "Découvrez tous nos services.",
      services: [],
    });
  }
});

module.exports = serviceRouter;
