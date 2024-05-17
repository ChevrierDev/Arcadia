const express = require("express");
const employeeDashboardRouter = express.Router();
const upload = require("../../../utils/multer.config");
const db = require("../../../config/db");

const {
  checkAuthenticated,
  checkRole,
} = require("../../../middlewares/Autorisation/autorisation.middleware");

const { enrichUserWithInfo } = require("../../../middlewares/enrichUserInfo");

const {
  fetchServicesData,
  fetchReviewsData,
  fetchAnimalsData,
} = require("../../../utils/apiClient");

// Controllers
const {
  updateReview,
  deleteReview,
} = require("../../../controllers/visitorReview/visitorReview.controllers");

const {
  getAnimalByID,
} = require("../../../controllers/animal/animal.controllers");

const {
  getServicesByID,
  postServices,
  updateServices,
  deleteServices,
} = require("../../../controllers/services/services.controllers");

const {
  consommationRules,
  validateConsommation,
} = require("../../../middlewares/consommationValidator");

const {
  serviceRules,
  validateService,
} = require("../../../middlewares/serviceValidator");

const decodeData = require("../../../utils/decodeData");

// Render employee dashboard
employeeDashboardRouter.get(
  "/dashboard",
  checkAuthenticated,
  checkRole("employee"),
  enrichUserWithInfo,
  async (req, res) => {
    try {
      const reviews = await fetchReviewsData();
      const decodedReviews = decodeData(reviews);
      res.render("employee/employeeDashboard", {
        title: "Votre espace employé.",
        user: req.user.details,
        reviews: decodedReviews,
      });
    } catch (error) {
      console.error("Error rendering the dashboard:", error);
      res.status(500).send("Internal server error.");
    }
  }
);

// Render employee service management
employeeDashboardRouter.get(
  "/services",
  checkAuthenticated,
  checkRole("employee"),
  enrichUserWithInfo,
  async (req, res) => {
    try {
      const services = await fetchServicesData();
      const decodedServices = decodeData(services);
      res.render("employee/services", {
        title: "Gestion des services du zoo.",
        user: req.user.details,
        services: decodedServices,
      });
    } catch (error) {
      console.error("Error rendering the dashboard:", error);
      res.status(500).send("Internal server error.");
    }
  }
);

// Render employee consumption management
employeeDashboardRouter.get(
  "/reportAlimentation",
  checkAuthenticated,
  checkRole("employee"),
  enrichUserWithInfo,
  async (req, res) => {
    try {
      const animals = await fetchAnimalsData();
      res.render("employee/consommation", {
        title: "Gestion des consommations du zoo.",
        user: req.user.details,
        animals: animals,
      });
    } catch (error) {
      console.error("Error rendering the dashboard:", error);
      res.status(500).send("Internal server error.");
    }
  }
);

// Render employee service post page
employeeDashboardRouter.get(
  "/poster-service",
  checkAuthenticated,
  checkRole("employee"),
  enrichUserWithInfo,
  async (req, res) => {
    try {
      const serviceError = req.flash("error_msg");
      res.render("employee/postService", {
        title: "Poster un nouveau service.",
        user: req.user.details,
        redirectTo: req.originalUrl,
        errors: serviceError,
      });
    } catch (error) {
      console.error("Error rendering the dashboard:", error);
      res.status(500).send("Internal server error.");
    }
  }
);

// Render employee service update page
employeeDashboardRouter.get(
  "/modifier-services/:id",
  checkAuthenticated,
  checkRole("employee"),
  enrichUserWithInfo,
  async (req, res) => {
    try {
      const services = await getServicesByID(req);
      const serviceError = req.flash("error_msg");
      res.render("employee/updateService", {
        title: "Modifier un service.",
        services: services,
        user: req.user.details,
        redirectTo: req.originalUrl,
        errors: serviceError,
      });
    } catch (error) {
      console.error("Error rendering the dashboard:", error);
      res.status(500).send("Internal server error.");
    }
  }
);

// Render employee post consumption page
employeeDashboardRouter.get(
  "/nourrir-animal/:id",
  checkAuthenticated,
  checkRole("employee"),
  enrichUserWithInfo,
  async (req, res) => {
    try {
      const animals = await getAnimalByID(req);
      const consumptionError = req.flash("error_msg");
      const foods = await db.query(
        "SELECT food_id, name, quantity FROM food WHERE quantity > 0;"
      );
      res.render("employee/postConsommation", {
        title: "Nourrir un animal.",
        animals: animals,
        user: req.user.details,
        foods: foods.rows,
        redirectTo: req.originalUrl,
        errors: consumptionError,
      });
    } catch (error) {
      console.error("Error rendering the dashboard:", error);
      res.status(500).send("Internal server error.");
    }
  }
);

// Employee post new service
employeeDashboardRouter.post(
  "/post-services",
  checkAuthenticated,
  checkRole("employee"),
  upload.single("images"),
  serviceRules(),
  validateService,
  async (req, res) => {
    try {
      await postServices(req);
      res.redirect("/employee/services?success=servicePosted");
    } catch (err) {
      console.error("Erreur lors de la publication du service :", err.message);
      res
        .status(500)
        .send("Une erreur est survenue lors de la publication du service.");
    }
  }
);

// Employee post consumption transaction
employeeDashboardRouter.post(
  "/post-consommation",
  checkAuthenticated,
  checkRole("employee"),
  consommationRules(),
  validateConsommation,
  async (req, res) => {
    const { grammage, animal_id, employee_id, food_id } = req.body;
    try {
      await db.query("BEGIN");

      const insertConsumption = `
        INSERT INTO consommation (date, heure, grammage, animal_id, employee_id, food_id)
        VALUES (CURRENT_DATE, CURRENT_TIME, $1, $2, $3, $4);
      `;
      await db.query(insertConsumption, [
        grammage,
        animal_id,
        employee_id,
        food_id,
      ]);

      const updateFood = `
        UPDATE food SET quantity = quantity - $1 WHERE food_id = $2;
      `;
      await db.query(updateFood, [grammage, food_id]);

      await db.query("COMMIT");
      res.redirect("/employee/reportAlimentation?success=ConsumptionRecorded");
    } catch (error) {
      await db.query("ROLLBACK");
      console.error("Failed to record consumption:", error);
      res.status(500).send("Failed to record consumption");
    }
  }
);

// Update approved review
employeeDashboardRouter.put(
  "/dashboard/:id",
  checkAuthenticated,
  checkRole("employee"),
  async (req, res) => {
    try {
      await updateReview(req);
      res.redirect("/employee/dashboard");
    } catch (err) {
      console.log("Error while updating review.");
      res.status(500).send("Internal server error.");
    }
  }
);

// Employee update service
employeeDashboardRouter.put(
  "/modifier-services/:id",
  checkAuthenticated,
  checkRole("employee"),
  upload.single("images"),
  serviceRules(),
  validateService,
  async (req, res) => {
    try {
      await updateServices(req, res);
      res.redirect("/employee/services");
    } catch (err) {
      console.error("Error updating services data: ", err);
      res.status(500).send("Internal server error");
    }
  }
);

// Delete service
employeeDashboardRouter.delete(
  "/services/:id",
  checkAuthenticated,
  checkRole("employee"),
  async (req, res) => {
    try {
      await deleteServices(req);
      res.redirect("/employee/services?success=serviceDeleted");
    } catch (err) {
      console.error("Error deleting services data: ", err);
      res.status(500).send("Internal server error");
    }
  }
);

// Delete review
employeeDashboardRouter.delete(
  "/review/:id",
  checkAuthenticated,
  checkRole("employee"),
  async (req, res) => {
    try {
      await deleteReview(req);
      res.redirect("/employee/dashboard?success=reviewDeleted");
    } catch (err) {
      console.error("Error deleting reviews data: ", err);
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = employeeDashboardRouter;
