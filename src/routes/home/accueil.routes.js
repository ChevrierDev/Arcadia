const express = require("express");
const accueilRouter = express.Router();
const db = require('../../config/db');
const {
  fetchServicesData,
  fetchAnimalsData,
  fetchHabitatData,
  fetchReviewsData,
} = require("../../utils/apiClient");

const decodeData = require("../../utils/decodeData");

// Route to render the home page
accueilRouter.get("/", async (req, res) => {
  try {
    // Requête pour obtenir les animaux
    const animalsQuery = `
      SELECT 
        animal.*, 
        habitat.name AS habitat_name 
      FROM 
        animal
      JOIN 
        habitat ON animal.habitat_id = habitat.habitat_id;
    `;
    const { rows: animals } = await db.query(animalsQuery);

    // Requête pour obtenir les services
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

    // Requête pour obtenir les habitats
    const habitatsQuery = `
      SELECT 
        habitat_id,
        name,
        description,
        images
      FROM 
        habitat
    `;
    const { rows: habitats } = await db.query(habitatsQuery);

    // Requête pour obtenir les avis des visiteurs approuvés
    const reviewsQuery = `
      SELECT 
        review_id,
        pseudo,
        description,
        approved
      FROM 
        review
      WHERE 
        approved = true
    `;
    const { rows: reviews } = await db.query(reviewsQuery);

    const decodedAnimal = decodeData(animals);
    const decodedService = decodeData(services);
    const decodedHabitats = decodeData(habitats);
    const decodedApprovedReviews = decodeData(reviews);

    console.log(decodedAnimal);
    console.log(decodedService);
    console.log(decodedApprovedReviews);
    console.log(decodedHabitats);
    
    const errorMessagesLogin = req.flash('error_msg_login');
    const errorMessagesReview = req.flash('error_msg_review');

    res.render("layouts/accueil", {
      title: "Page d'accueil",
      animals: decodedAnimal,
      services: decodedService,
      habitats: decodedHabitats,
      reviews: decodedApprovedReviews,
      errorMessagesLogin: errorMessagesLogin,
      errorMessagesReview: errorMessagesReview
    });
  } catch (err) {
    console.log(err);
    res.render("layouts/accueil", {
      title: "Page d'accueil",
      animals: [],
      services: [],
      habitats: [],
      reviews: [],
      errorMessagesLogin: req.flash('error_msg_login'),
      errorMessagesReview: req.flash('error_msg_review'),
    });
  }
});

module.exports = accueilRouter;
