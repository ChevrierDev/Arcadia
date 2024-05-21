const express = require("express");
const adminDashboardRouter = express.Router();
const upload = require("../../../utils/multer.config");
const Animal = require('../../../models/animalViews.schema');

const {
  checkAuthenticated,
  checkRole,
} = require("../../../middlewares/Autorisation/autorisation.middleware");

const {
  fetchEmployeeData,
  fetchVeterinarianData,
  fetchServicesData,
  fetchHabitatData,
  fetchAnimalsData,
  fetchFoodData,
  fetchHealthReportData,
} = require("../../../utils/apiClient");

const {
  createVeterinarianAccount,
  getVeterinarianAccountByID,
  UpdateVeterinarianAccount,
} = require("../../../controllers/veterinarian/createVeterinarian.controllers");

const {
  getEmployeeAccountByID,
  UpdateEmployeeAccount,
  createEmployeeAccount,
} = require("../../../controllers/employee/manageEmployeeAccount");

const {
  getServicesByID,
  postServices,
  updateServices,
  deleteServices,
} = require("../../../controllers/services/services.controllers");

const {
  getHabitatByID,
  postHabitat,
  updateHabitat,
  deleteHabitat,
} = require("../../../controllers/habitat/habitat.controllers");

const {
  getAnimalByID,
  postAnimal,
  updateAnimal,
  deleteAnimal,
} = require("../../../controllers/animal/animal.controllers");

const {
  getFoodByID,
  postFood,
  updateFood,
  deleteFood,
} = require('../../../controllers/food/food.controllers');

const {
  employeeRules,
  validateEmployee
} = require('../../../middlewares/employeeAccount.validator');

const {
  veterinarianRules,
  validateVeterinarian
} = require('../../../middlewares/veterinarianAccount');

const {
  serviceRules,
  validateService,
} = require('../../../middlewares/serviceValidator');

const { 
  animalRules,
  validateAnimal
} = require('../../../middlewares/animalValidator');

const {
  foodRules,
  validateFood
} = require('../../../middlewares/foodValidator');

const {
  habitatRules,
  validatehabitat
} = require('../../../middlewares/habitatValidator');

const decodedData = require('../../../utils/decodeData');

const db = require('../../../config/db')

// Render admin dashboard
adminDashboardRouter.get(
  "/dashboard",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      const employees = await fetchEmployeeData();
      const vets = await fetchVeterinarianData();
      res.render("admin/adminDashboard", {
        title: "Votre espace personnel",
        employees,
        vets,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des employés: ", error);
      res.status(500).send("Erreur lors de la récupération des données des employés.");
    }
  }
);

// Render services dashboard
adminDashboardRouter.get(
  "/services",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {

      const services = await fetchServicesData();
      const serviceDecoded = decodedData(services)
      res.render("admin/services", {
        title: "Liste des services disponibles",
        services: serviceDecoded,
      });
    } catch (err) {
      console.error(err);
      res.status(500).render("admin/services", {
        title: "Liste des services disponibles",
        services: [],
      });
    }
  }
);

// Render animals dashboard
adminDashboardRouter.get(
  "/animaux",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      const animals = await fetchAnimalsData();
      const decodedAnimal = decodedData(animals)
      res.render("admin/animaux", {
        title: "Liste des animaux",
        animals: decodedAnimal,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching animal data");
    }
  }
);

// Render habitats dashboard
adminDashboardRouter.get(
  "/habitats",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      const habitatQuery = `
      SELECT *
      FROM habitat
      `;
      const { rows: habitats } = await db.query(habitatQuery);
      const decodedHabitats = decodedData(habitats);
      res.render("admin/habitats", {
        title: "Liste des habitats",
        habitats: decodedHabitats,
      });
    } catch (err) {
      console.error(err);
      res.status(500).render("admin/habitats", {
        title: "Liste des habitats",
        habitats: [],
        error: "Error fetching habitat data",
      });
    }
  }
);

// Render food dashboard
adminDashboardRouter.get(
  "/food",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      const foods = await fetchFoodData();
      const decodedFoods = decodedData(foods);
      res.render("admin/food", {
        title: "Nourriture disponible dans le zoo",
        foods: decodedFoods,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching food data");
    }
  }
);

// Render vet report dashboard
adminDashboardRouter.get(
  "/rapport",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      const { startDate, endDate, animalName, ajax } = req.query;
      let reports = await fetchHealthReportData();
      const animals = await fetchAnimalsData();
      const decodedAnimals = decodedData(animals);
      
      // Filter reports by date
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);

        reports = reports.filter(report => {
          const reportDate = new Date(report.date);
          return reportDate >= start && reportDate <= end;
        });
      }

      // Filter reports by animal name
      if (animalName) {
        reports = reports.filter(report => report.animal_name === animalName);
      }

      if (ajax) {
        res.render("admin/partials/vetReportTable", { reports });
      } else {
        res.render("admin/vetReport", {
          title: "Rapport vétérinaire",
          reports,
          animals: decodedAnimals,
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching report data");
    }
  }
);

// Render stats dashboard
adminDashboardRouter.get(
  "/stats",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      const animals = await Animal.find({}).sort({ visits: -1 }).exec();
      res.render("admin/stats", {
        title: "Consulter les vues de vos animaux",
        animals,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching animal data");
    }
  }
);

// Render create user dashboard
adminDashboardRouter.get(
  "/dashboard/create-users",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      const UserError = req.flash("error_msg");
      res.render("admin/createUserDash", {
        title: "Créer un utilisateur",
        errors: UserError,
        redirectTo: req.originalUrl,
      });
    } catch (err) {
      console.error(err);
    }
  }
);

// Render post new service
adminDashboardRouter.get(
  "/dashboard/post-services",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
        const serviceError = req.flash("error_msg");
      res.render("admin/postServices", {
        title: "Poster un nouveau service",
        errors: serviceError,
        redirectTo: req.originalUrl,
        
      });
    } catch (err) {
      console.error(err);
    }
  }
);

// Render post new habitat
adminDashboardRouter.get(
  "/post-habitat",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      const habitatError = req.flash("error_msg");
      res.render("admin/postHabitats", {
        title: "Poster un nouvel habitat",
        redirectTo: req.originalUrl,
        errors: habitatError,
      });
    } catch (err) {
      console.error(err);
    }
  }
);

// Render post new animal
adminDashboardRouter.get(
  "/post-animal",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      const habitatQuery = `
          SELECT *
          FROM habitat
      `;
      const {rows: habitats} = await db.query(habitatQuery) 
      const animalError = req.flash("error_msg");
      res.render("admin/postAnimals", {
        title: "Poster un nouvel animal",
        habitats,
        redirectTo: req.originalUrl,
        errors: animalError,
      });
    } catch (err) {
      console.error(err);
      res.status(500).render("admin/postAnimals", {
        title: "Liste des habitats",
        habitats: [],
        error: "Error fetching habitat data",
      });
    }
  }
);

// Render post new food
adminDashboardRouter.get(
  "/post-foods",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      const foodError = req.flash("error_msg");
      res.render("admin/postFood", {
        title: "Ajouter de la nourriture",
        redirectTo: req.originalUrl,
        errors: foodError,
      });
    } catch (err) {
      console.error(err);
    }
  }
);

// Render update employee page
adminDashboardRouter.get(
  "/dashboard/update-users/:id",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      const employee = await getEmployeeAccountByID(req, res);
      if (!employee) {
        return res.status(404).send("Employee not found");
      }
      res.render("admin/updateUser", {
        title: "Modifier les informations de l'utilisateur",
        employee,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching employee data");
    }
  }
);

// Render update vet page
adminDashboardRouter.get(
  "/dashboard/update-vet/:id",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      const vet = await getVeterinarianAccountByID(req, res);
      res.render("admin/updateVet", {
        title: "Modifier les informations du vétérinaire",
        vet,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching vet data");
    }
  }
);

// Render update service page
adminDashboardRouter.get(
  "/modifier-services/:id",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      const services = await getServicesByID(req, res);
      res.render("admin/updateServices", {
        title: "Modifier les informations du service",
        services,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching services data");
    }
  }
);

// Render update habitat page
adminDashboardRouter.get(
  "/modifier-habitat/:id",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      const habitats = await getHabitatByID(req, res);
      res.render("admin/updateHabitats", {
        title: "Modifier l'habitat",
        habitats,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching habitats data");
    }
  }
);

// Render update animal page
adminDashboardRouter.get(
  "/animal/:id",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
     const animals = await getAnimalByID(req)
      res.render("admin/updateAnimals", {
        title: "Modifier l'animal",
        animals: animals,
      });
    } catch (err) {
      console.error(err);
      res.render("admin/updateAnimals", {
        title: "Modifier l'animal",
        animals: [],
      });
    }
  }
);

// Render update food page
adminDashboardRouter.get(
  "/modifier-foods/:id",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      const foods = await getFoodByID(req, res);
      res.render("admin/updateFood", {
        title: "Modifier l'aliment",
        foods,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching food data");
    }
  }
);

// Admin create employee
adminDashboardRouter.post(
  "/dashboard/create-employee",
  checkAuthenticated,
  checkRole("admin"),
  employeeRules(),
  validateEmployee,
  async (req, res) => {
    try {
      await createEmployeeAccount(req, res);
      res.redirect("/admin/dashboard?success=employeeCreated");
    } catch (err) {
      console.error("Error while creating employee: ", err);
      res.status(500).send("Internal server error");
    }
  }
);

// Admin create veterinarian
adminDashboardRouter.post(
  "/dashboard/create-veterinarian",
  checkAuthenticated,
  checkRole("admin"),
  veterinarianRules(),
  validateVeterinarian,
  async (req, res) => {
    try {
      await createVeterinarianAccount(req, res);
      res.redirect("/admin/dashboard?success=veterinarianCreated");
    } catch (err) {
      console.error("Error while creating veterinarian: ", err);
      res.status(500).send("Internal server error");
    }
  }
);

// Admin post new service
adminDashboardRouter.post(
  "/dashboard/post-services",
  checkAuthenticated,
  checkRole("admin"),
  upload.single("images"),
  async (req, res) => {
    try {
      await postServices(req);
      res.redirect("/admin/services?success=servicePosted");
    } catch (err) {
      console.error("Erreur lors de la publication du service :", err.message);
      res.status(500).send("Une erreur est survenue lors de la publication du service.");
    }
  }
);

// Admin post new habitat
adminDashboardRouter.post(
  "/post-habitat",
  checkAuthenticated,
  checkRole("admin"),
  upload.single("images"),
  habitatRules(),
  validatehabitat,
  async (req, res) => {
    try {
      await postHabitat(req);
      res.redirect("/admin/habitats?success=habitatPosted");
    } catch (err) {
      console.error("Erreur lors de la publication de l'habitat :", err.message);
      res.status(500).send("Internal server error.");
    }
  }
);

// Admin post new animal
adminDashboardRouter.post(
  "/post-animal",
  checkAuthenticated,
  checkRole("admin"),
  upload.single("images"),
  animalRules(),
  validateAnimal,
  async (req, res) => {
    try {
      await postAnimal(req);
      res.redirect("/admin/animaux?success=animalPosted");
    } catch (err) {
      console.error("Erreur lors de la publication de l'animal :", err.message);
      res.status(500).send("Internal server error.");
    }
  }
);

// Admin post new food
adminDashboardRouter.post(
  "/post-foods",
  checkAuthenticated,
  checkRole("admin"),
  foodRules(),
  validateFood,
  async (req, res) => {
    try {
      await postFood(req);
      res.redirect("/admin/food?success=foodPosted");
    } catch (err) {
      console.error("Erreur lors de la publication de la nourriture :", err.message);
      res.status(500).send("Internal server error.");
    }
  }
);

// Admin update veterinarian
adminDashboardRouter.put(
  "/dashboard/update-users/:id",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      await UpdateVeterinarianAccount(req);
    } catch (err) {
      console.error("Error updating veterinarian data: ", err);
      res.status(500).send("Internal server error");
    }
  }
);

// Admin update employee
adminDashboardRouter.put(
  "/dashboard/update-users/:id",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      await UpdateEmployeeAccount(req);
    } catch (err) {
      console.error("Error updating employee data: ", err);
      res.status(500).send("Internal server error");
    }
  }
);

// Admin update service
adminDashboardRouter.put(
  "/modifier-services/:id",
  checkAuthenticated,
  checkRole("admin"),
  upload.single("images"),
  async (req, res) => {
    try {
      await updateServices(req);
      res.redirect("/admin/services");
    } catch (err) {
      console.error("Error updating services data: ", err);
      res.status(500).send("Internal server error");
    }
  }
);

// Admin update habitat
adminDashboardRouter.put(
  "/modifier-habitat/:id",
  checkAuthenticated,
  checkRole("admin"),
  upload.single("images"),
  async (req, res) => {
    try {
      await updateHabitat(req);
      res.redirect("/admin/habitats");
    } catch (err) {
      console.error("Error updating habitat data: ", err);
      res.status(500).send("Internal server error");
    }
  }
);

// Admin update animal
adminDashboardRouter.put(
  "/modifier-animal/:id",
  checkAuthenticated,
  checkRole("admin"),
  upload.single("images"),
  async (req, res) => {
    try {
      await updateAnimal(req);
      res.redirect("/admin/animaux");
    } catch (err) {
      console.error("Error updating animal data: ", err);
      res.status(500).send("Internal server error");
    }
  }
);

// Admin update food
adminDashboardRouter.put(
  "/modifier-food/:id",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      await updateFood(req);
      res.redirect("/admin/food");
    } catch (err) {
      console.error("Error updating food data: ", err);
      res.status(500).send("Internal server error");
    }
  }
);

// Delete service
adminDashboardRouter.delete(
  "/services/:id",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      await deleteServices(req);
      res.redirect("/admin/services?success=serviceDeleted");
    } catch (err) {
      console.error("Error deleting services data: ", err);
      res.status(500).send("Internal server error");
    }
  }
);

// Delete habitat
adminDashboardRouter.delete(
  "/habitats/:id",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      await deleteHabitat(req);
      res.redirect("/admin/habitats?success=habitatDeleted");
    } catch (err) {
      console.error("Error deleting habitat data: ", err);
      res.status(500).send("Internal server error");
    }
  }
);

// Delete animal
adminDashboardRouter.delete(
  "/animal/:id",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      await deleteAnimal(req);
      res.redirect("/admin/animaux?success=animalDeleted");
    } catch (err) {
      console.error("Error deleting animal data: ", err);
      res.status(500).send("Internal server error");
    }
  }
);

// Delete food
adminDashboardRouter.delete(
  "/delete/:id",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      await deleteFood(req);
      res.redirect("/admin/food?success=foodDeleted");
    } catch (err) {
      console.error("Error deleting food data: ", err);
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = adminDashboardRouter;
