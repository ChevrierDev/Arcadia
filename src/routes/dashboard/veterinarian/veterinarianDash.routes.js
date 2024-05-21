const express = require("express");
const veterinarianDashboardRouter = express.Router();
const decodeData = require("../../../utils/decodeData");
const db = require('../../../config/db')

const {
  checkAuthenticated,
  checkRole,
} = require("../../../middlewares/Autorisation/autorisation.middleware");

const {
  enrichVetUserWithInfo,
} = require("../../../middlewares/enrichUserInfo");

const {
  fetchAnimalsData,
  fetchHealthReportData,
  fetchHabitatData,
  fetchConsommationReportData,
} = require("../../../utils/apiClient");

const {
  getAnimalByID,
} = require("../../../controllers/animal/animal.controllers");

const {
  getHabitatByID,
  vetUpdateHabitat,
} = require("../../../controllers/habitat/habitat.controllers");

const {
  postHealthRecords,
} = require("../../../controllers/healthRecord/healthRecord.controllers");

const {
  healthRecordRules,
  validatehealthRecord,
} = require("../../../middlewares/healthRecordValidator");

const {
  habitatCommentRules,
  validateCommenthabitat,
} = require("../../../middlewares/vetCommentHabitat");


// Render veterinarian dashboard
veterinarianDashboardRouter.get(
  "/dashboard",
  checkAuthenticated,
  checkRole("veterinarian"),
  enrichVetUserWithInfo,
  async (req, res) => {
    try {
      const animals = await fetchAnimalsData();
      const decodedAnimal = decodeData(animals)
      res.render("veterinarian/veterinarianDashboard", {
        title: "Votre espace vétérinaire.",
        user: req.user.details,
        animals: decodedAnimal,
      });
    } catch (err) {
      console.log("Error while fetching animal data", err);
    }
  }
);

// Render veterinarian habitat dashboard
veterinarianDashboardRouter.get(
  "/habitats",
  checkAuthenticated,
  checkRole("veterinarian"),
  enrichVetUserWithInfo,
  async (req, res) => {
    try {
      const habitatQuery = `
      SELECT *
      FROM habitat
      `;
      const { rows: habitats } = await db.query(habitatQuery);
      const decodedHabitat =  decodeData(habitats)
      console.log("Habitats:", habitats);
      res.render("veterinarian/habitat", {
        title: "Votre espace vétérinaire.",
        user: req.user.details,
        habitats: decodedHabitat,
      });
    } catch (err) {
      console.log("Error while fetching habitat data", err);
      res.render("veterinarian/habitat", {
        title: "Votre espace vétérinaire.",
        user: req.user.details,
        habitats: [],
      });
    }
  }
);

// Render veterinarian health report form
veterinarianDashboardRouter.get(
  "/healthReport/:id",
  checkAuthenticated,
  checkRole("veterinarian"),
  enrichVetUserWithInfo,
  async (req, res) => {
    try {
      const reportError = req.flash("error_msg");
      const animals = await getAnimalByID(req);
      res.render("veterinarian/healthReport", {
        title: "Faire un rapport.",
        user: req.user.details,
        animals: animals,
        errors: reportError,
        redirectTo: req.originalUrl,
      });
    } catch (err) {
      console.log("Error while fetching animal data", err);
      res.render("veterinarian/healthReport", {
        title: "Faire un rapport.",
        user: req.user.details,
        animals: [],
        redirectTo: req.originalUrl,
      });
    }
  }
);

// Render veterinarian consumption historical report
veterinarianDashboardRouter.get(
  "/consommation",
  checkAuthenticated,
  checkRole("veterinarian"),
  enrichVetUserWithInfo,
  async (req, res) => {
    try {
      const consommations = await fetchConsommationReportData();
      res.render("veterinarian/consommationReport", {
        title: "Consultez l'historique de la consommation des animaux.",
        user: req.user.details,
        consommations: consommations,
      });
    } catch (err) {
      console.log("Error while fetching consumption data", err);
    }
  }
);

// Render veterinarian habitat comment form
veterinarianDashboardRouter.get(
  "/habitat-comment/:id",
  checkAuthenticated,
  checkRole("veterinarian"),
  enrichVetUserWithInfo,
  async (req, res) => {
    try {
      const habitats = await getHabitatByID(req);
      const commentError = req.flash("error_msg");
      res.render("veterinarian/comment", {
        title: "Commenter l'habitat.",
        user: req.user.details,
        habitats: habitats,
        errors: commentError,
        redirectTo: req.originalUrl,
      });
    } catch (err) {
      console.log("Error while fetching habitat data", err);
    }
  }
);

// Render veterinarian health report historical
veterinarianDashboardRouter.get(
  "/report-historical",
  checkAuthenticated,
  checkRole("veterinarian"),
  enrichVetUserWithInfo,
  async (req, res) => {
    try {
      const report = await fetchHealthReportData();
      const decodedReport = decodeData(report);
      res.render("veterinarian/healthReportHistorical", {
        title: "Votre historique des rapports médicaux.",
        user: req.user.details,
        reports: decodedReport,
      });
    } catch (err) {
      console.log("Error while fetching health report data", err);
    }
  }
);

// Veterinarian post health report
veterinarianDashboardRouter.post(
  "/rapport-medical",
  checkAuthenticated,
  checkRole("veterinarian"),
  enrichVetUserWithInfo,
  healthRecordRules(),
  validatehealthRecord,
  async (req, res) => {
    try {
      await postHealthRecords(req);
      res.redirect("/veterinarian/dashboard?success=reportCreated");
    } catch (err) {
      console.log(err);
    }
  }
);

// Veterinarian post habitat comment
veterinarianDashboardRouter.put(
  "/commentaire/:id",
  checkAuthenticated,
  checkRole("veterinarian"),
  enrichVetUserWithInfo,
  habitatCommentRules(),
  validateCommenthabitat,
  async (req, res) => {
    try {
      await vetUpdateHabitat(req);
      res.redirect("/veterinarian/habitats?success=commentCreated");
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = veterinarianDashboardRouter;
