const express = require("express");
const veterinarianDashboardRouter = express.Router();

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
  fetchConsommationReportData
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

//render veterinarian dashboard
veterinarianDashboardRouter.get(
  "/dashboard",
  checkAuthenticated,
  checkRole("veterinarian"),
  enrichVetUserWithInfo,
  async (req, res) => {
    try {
      const animals = await fetchAnimalsData();
      res.render("veterinarian/veterinarianDashboard", {
        title: "Votre espace vétérinaire.",
        user: req.user.details,
        animals: animals,
      });
    } catch (err) {
      console.log("error while fetchin animal data", err);
    }
  }
);

//render veterinarian habitat dash
veterinarianDashboardRouter.get(
  "/habitats",
  checkAuthenticated,
  checkRole("veterinarian"),
  enrichVetUserWithInfo,
  async (req, res) => {
    try {
      const habitats = await fetchHabitatData();
      res.render("veterinarian/habitat", {
        title: "Votre espace vétérinaire.",
        user: req.user.details,
        habitats: habitats,
      });
    } catch (err) {
      console.log("error while fetchin habitat data", err);
    }
  }
);

//render veterinarian health report form
veterinarianDashboardRouter.get(
  "/healthReport/:id",
  checkAuthenticated,
  checkRole("veterinarian"),
  enrichVetUserWithInfo,
  async (req, res) => {
    try {
      const animals = await getAnimalByID(req);
      res.render("veterinarian/healthReport", {
        title: "Faite un rapport.",
        user: req.user.details,
        animals: animals,
      });
    } catch (err) {
      console.log("error while fetchin animal data", err);
    }
  }
);

//render veterinarian consommation historical report
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
      console.log("error while fetchin animal data", err);
    }
  }
);

//render veterinarian habitat comment form
veterinarianDashboardRouter.get(
  "/habitat-comment/:id",
  checkAuthenticated,
  checkRole("veterinarian"),
  enrichVetUserWithInfo,
  async (req, res) => {
    try {
      const habitats = await getHabitatByID(req);
      res.render("veterinarian/comment", {
        title: "Commenter l'habitat.",
        user: req.user.details,
        habitats: habitats
      });
    } catch (err) {
      console.log("error while fetchin animal data", err);
    }
  }
);

//render veterinarian health report historical
veterinarianDashboardRouter.get(
  "/report-historical",
  checkAuthenticated,
  checkRole("veterinarian"),
  enrichVetUserWithInfo,
  async (req, res) => {
    try {
      const report = await fetchHealthReportData();
      console.log(report);
      res.render("veterinarian/healthReportHistorical", {
        title: "Votre  historique des rapports médicaux.",
        user: req.user.details,
        reports: report,
      });
    } catch (err) {
      console.log("error while fetchin animal data", err);
    }
  }
);

//veterinarian post report feature
veterinarianDashboardRouter.post(
  "/rapport-medical",
  checkAuthenticated,
  checkRole("veterinarian"),
  enrichVetUserWithInfo,
  async (req, res) => {
    try {
      await postHealthRecords(req);
      res.redirect("/veterinarian/dashboard?success=reportCreated");
    } catch (err) {
      console.log(err);
    }
  }
);

//veterinarian post comment habitat feature
veterinarianDashboardRouter.put(
  "/commentaire/:id",
  checkAuthenticated,
  checkRole("veterinarian"),
  enrichVetUserWithInfo,
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
