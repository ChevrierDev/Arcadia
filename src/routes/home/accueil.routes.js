const express = require("express");
const accueilRouter = express.Router();
const {
  fetchServicesData,
  fetchAnimalsData,
} = require("../../utils/apiClient");

accueilRouter.get("/", async (req, res) => {
  try {
    const animals = await fetchAnimalsData();
    const services = await fetchServicesData();
    res.render("layouts/accueil", {
      title: "Page d'accueil",
      animals: animals,
      services: services,
    });
  } catch (err) {
    console.log(err);
    res.render("layouts/accueil", {
      title: "Page d'accueil",
      animals: [],
      services: [],
    });
  }
});

module.exports = accueilRouter;
