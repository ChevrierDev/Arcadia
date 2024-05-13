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

//get reviews controllers
const {
  getReviewByID,
  postReview,
  updateReview,
  deleteReview,
} = require("../../../controllers/visitorReview/visitorReview.controllers");

const {
  getAnimals,
  getAnimalByID,
  postAnimal,
  updateAnimal,
  deleteAnimal,
} = require("../../../controllers/animal/animal.controllers");

const {
  getServicesByID,
  postServices,
  updateServices,
  deleteServices,
} = require("../../../controllers/services/services.controllers");

const decodeData = require("../../../utils/decodeData");

//render employee dashboard
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
        title: "Votre espace employer.",
        user: req.user.details,
        reviews: decodedReviews,
      });
    } catch (error) {
      console.error("Error rendering the dashboard:", error);
      res.status(500).send("Internal server error.");
    }
  }
);

//render employee service management
employeeDashboardRouter.get(
  "/services",
  checkAuthenticated,
  checkRole("employee"),
  enrichUserWithInfo,
  async (req, res) => {
    try {
      const services = await fetchServicesData();
      res.render("employee/services", {
        title: "Gestion des services du zoo.",
        user: req.user.details,
        services: services,
      });
    } catch (error) {
      console.error("Error rendering the dashboard:", error);
      res.status(500).send("Internal server error.");
    }
  }
);

//render employee Consumption management
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

//render employee service post
employeeDashboardRouter.get(
  "/poster-service",
  checkAuthenticated,
  checkRole("employee"),
  enrichUserWithInfo,
  async (req, res) => {
    try {
      res.render("employee/postService", {
        title: "Poster un nouveau services.",
        user: req.user.details,
      });
    } catch (error) {
      console.error("Error rendering the dashboard:", error);
      res.status(500).send("Internal server error.");
    }
  }
);

//employee render update post page
employeeDashboardRouter.get(
  "/modifier-services/:id",
  checkAuthenticated,
  checkRole("employee"),
  enrichUserWithInfo,
  async (req, res) => {
    try {
      const services = await getServicesByID(req);
      res.render("employee/updateService", {
        title: "modifier un  services.",
        services: services,
        user: req.user.details,
      });
    } catch (error) {
      console.error("Error rendering the dashboard:", error);
      res.status(500).send("Internal server error.");
    }
  }
);

//employee render post Consumption
employeeDashboardRouter.get(
  "/nourrir-animal/:id",
  checkAuthenticated,
  checkRole("employee"),
  enrichUserWithInfo,
  async (req, res) => {
    try {
      const animals = await getAnimalByID(req);
      const foods = await db.query(
        "SELECT food_id, name, quantity FROM food WHERE quantity > 0;"
      );
      res.render("employee/postConsommation", {
        title: "Nourrir un  animal.",
        animals: animals,
        user: req.user.details,
        foods: foods.rows,
      });
    } catch (error) {
      console.error("Error rendering the dashboard:", error);
      res.status(500).send("Internal server error.");
    }
  }
);

//employee post new service
employeeDashboardRouter.post(
  "/post-services",
  checkAuthenticated,
  checkRole("employee"),
  upload.single("images"),
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

//employee post Consumption transaction
employeeDashboardRouter.post(
  "/post-consommation",
  checkAuthenticated,
  checkRole("employee"),
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
      res.redirect("/employee/reportAlimentation?success=Consumption Recorded");
    } catch (error) {
      await db.query("ROLLBACK");
      console.error("Failed to record consumption:", error);
      res.status(500).send("Failed to record consumption");
    }
  }
);



//update by approved review
employeeDashboardRouter.put(
  "/dashboard/:id",
  checkAuthenticated,
  checkRole("employee"),
  async (req, res) => {
    try {
      await updateReview(req);
      res.redirect("/employee/dashboard");
    } catch (err) {
      console.log("error while updating review.");
      res.status(500).send("Internal server error.");
    }
  }
);

//employee update service feature
employeeDashboardRouter.put(
  "/modifier-services/:id",
  checkAuthenticated,
  checkRole("employee"),
  upload.single("images"),
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

//delete service
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

//delete review
employeeDashboardRouter.delete(
  "/review/:id",
  checkAuthenticated,
  checkRole("employee"),
  async (req, res) => {
    try {
      await deleteReview(req);
      res.redirect("/employee/dashboard?success=serviceDeleted");
    } catch (err) {
      console.error("Error deleting reviews data: ", err);
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = employeeDashboardRouter;
