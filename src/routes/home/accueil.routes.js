const express = require("express");
const accueilRouter = express.Router();
const {
  fetchServicesData,
  fetchAnimalsData,
  fetchHabitatData,
} = require("../../utils/apiClient");

accueilRouter.get("/", async (req, res) => {
  try {
    const animals = await fetchAnimalsData();
    const services = await fetchServicesData();
    const habitats = await fetchHabitatData();
    res.render("layouts/accueil", {
      title: "Page d'accueil",
      animals: animals,
      services: services,
      habitats: habitats,
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
