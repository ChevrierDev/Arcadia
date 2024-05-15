const express = require("express");
const accueilRouter = express.Router();
const {
  fetchServicesData,
  fetchAnimalsData,
  fetchHabitatData,
  fetchReviewsData
} = require("../../utils/apiClient");

accueilRouter.get("/", async (req, res) => {
  try {
    const animals = await fetchAnimalsData();
    const services = await fetchServicesData();
    const habitats = await fetchHabitatData();
    const reviews = await fetchReviewsData()
    res.render("layouts/accueil", {
      title: "Page d'accueil",
      animals: animals,
      services: services,
      habitats: habitats,
      reviews: reviews
    });
  } catch (err) {
    console.log(err);
    res.render("layouts/accueil", {
      title: "Page d'accueil",
      animals: [],
      services: [],
      reviews: []
    });
  }
});

module.exports = accueilRouter;
