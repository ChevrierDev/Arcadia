const express = require("express");
const employeeDashboardRouter = express.Router();
const upload = require('../../../utils/multer.config')

const {
  checkAuthenticated,
  checkRole,
} = require("../../../middlewares/Autorisation/autorisation.middleware");

const userInfo = require("../../../middlewares/enrichUserInfo");

const {
  fetchServicesData,
  fetchReviewsData,
} = require("../../../utils/apiClient");

//get reviews controllers
const {
  getReviewByID,
  postReview,
  updateReview,
  deleteReview,
} = require("../../../controllers/visitorReview/visitorReview.controllers");

const {
    getServicesByID,
    postServices,
    updateServices,
    deleteServices,
} = require('../../../controllers/services/services.controllers')

const decodeData = require("../../../utils/decodeData");

//render employee dashboard
employeeDashboardRouter.get(
  "/dashboard",
  checkAuthenticated,
  checkRole("employee"),
  userInfo,
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
  userInfo,
  async (req, res) => {
    try {
        const services = await fetchServicesData()
      res.render("employee/services", {
        title: "Gestion des services du zoo.",
        user: req.user.details,
        services: services
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
  userInfo,
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
  userInfo,
  async (req, res) => {
    try {
       const services = await getServicesByID(req)
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
