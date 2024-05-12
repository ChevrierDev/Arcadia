const express = require("express");
const adminDashboardRouter = express.Router();
const upload = require("../../../utils/multer.config");

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
} = require("../../../utils/apiClient");

//vet controllers
const {
  createVeterinarianAccount,
  getVeterinarianAccountByID,
  UpdateVeterinarianAccount,
} = require("../../../controllers/veterinarian/createVeterinarian.controllers");

//employee controller
const {
  getEmployeeAccountByID,
  UpdateEmployeeAccount,
  createEmployeeAccount,
} = require("../../../controllers/employee/manageEmployeeAccount");

//services controllers
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

//render admin dashboard
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
        employees: employees,
        vets: vets,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des employés: ", error);
      res
        .status(500)
        .send("Erreur lors de la récupération des données des employés.");
    }
  }
);

//admin render services Dashboard
adminDashboardRouter.get(
  "/services",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      const services = await fetchServicesData();
      res.render("admin/services", {
        title: "Liste des services disponibles",
        services: services,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching service data");
    }
  }
);

//admin render animals Dashboard
adminDashboardRouter.get(
  "/animaux",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      const animals = await fetchAnimalsData();
      res.render("admin/animaux", {
        title: "Liste des animaux.",
        animals: animals,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching service data");
    }
  }
);

//admin render habitats Dashboard
adminDashboardRouter.get(
  "/habitats",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      const habitats = await fetchHabitatData();
      res.render("admin/habitats", {
        title: "Liste des habitat.",
        habitats: habitats,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching service data");
    }
  }
);

//render admin create users dashboard
adminDashboardRouter.get(
  "/dashboard/create-users",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      res.render("admin/createUserDash", {
        title: "Créer un utilisateur.",
      });
    } catch (err) {
      console.log(err);
    }
  }
);

//admin render post new services
adminDashboardRouter.get(
  "/dashboard/post-services",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      res.render("admin/postServices", {
        title: "Poster un nouveau services.",
      });
    } catch (err) {
      console.log(err);
    }
  }
);

//admin render post new habitat
adminDashboardRouter.get(
  "/post-habitat",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      res.render("admin/postHabitats", {
        title: "Poster un nouvel habitat.",
      });
    } catch (err) {
      console.log(err);
    }
  }
);

//admin render post new animal
adminDashboardRouter.get(
  "/post-animal",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      res.render("admin/postAnimals", {
        title: "Poster un nouvel animal.",
      });
    } catch (err) {
      console.log(err);
    }
  }
);



//admin render update user employee features
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
        employee: employee,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Error fetching employee data");
    }
  }
);

//admin render update-vet feature
adminDashboardRouter.get(
  "/dashboard/update-vet/:id",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      const vet = await getVeterinarianAccountByID(req, res);
      console.log(vet);
      res.render("admin/updateVet", {
        title: "Modifier les informations du vétérinaire",
        vet: vet,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Error fetching vet data");
    }
  }
);

//admin render update service
adminDashboardRouter.get(
  "/modifier-services/:id",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      const services = await getServicesByID(req, res);
      console.log(services);
      res.render("admin/updateServices", {
        title: "Modifier les informations du services.",
        services: services,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Error fetching services data");
    }
  }
);

//admin render update habitat
adminDashboardRouter.get(
  "/modifier-habitat/:id",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      const habitats = await getHabitatByID(req, res);
      console.log(habitats);
      res.render("admin/updateHabitats", {
        title: "Modifier l'habitat.",
        habitats: habitats,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Error fetching habitats data");
    }
  }
);

//admin render update animal
adminDashboardRouter.get(
  "/animal/:id",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      const animals = await getAnimalByID(req, res);
      console.log(animals);
      res.render("admin/updateAnimals", {
        title: "Modifier l'animal.",
        animals: animals,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Error fetching habitats data");
    }
  }
);

// admin create employee features
adminDashboardRouter.post(
  "/dashboard/create-employee",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      await createEmployeeAccount(req, res);
      res.redirect("/admin/dashboard?success=employeeCreated");
    } catch (err) {
      console.error("Error while creating employee : ", err);
      res.status(500).send("Internal server error");
    }
  }
);

// Admin create veterinarian feature
adminDashboardRouter.post(
  "/dashboard/create-veterinarian",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      await createVeterinarianAccount(req, res);
      res.redirect("/admin/dashboard?success=veterinarianCreated");
    } catch (err) {
      console.error("Error while creating veterinarian : ", err);
      res.status(500).send("Internal server error");
    }
  }
);

// Admin post services feature
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
      res
        .status(500)
        .send("Une erreur est survenue lors de la publication du service.");
    }
  }
);

// Admin post new habitat
adminDashboardRouter.post(
  "/post-habitat",
  checkAuthenticated,
  checkRole("admin"),
  upload.single("images"),
  async (req, res) => {
    try {
      await postHabitat(req);
      res.redirect("/admin/habitats?success=servicePosted");
    } catch (err) {
      console.error("Erreur lors de la publication du service :", err.message);
      res
        .status(500)
        .send("Internal server error.");
    }
  }
);

//admin post new Animals
adminDashboardRouter.post(
  "/post-animal",
  checkAuthenticated,
  checkRole("admin"),
  upload.single("images"),
  async (req, res) => {
    try {
      await postAnimal(req);
      res.redirect("/admin/animaux?success=animalPosted");
    } catch (err) {
      console.error("Error while posting new animals :", err.message);
      res
        .status(500)
        .send("Internal server error.");
    }
  }
);

// admin put update veterinarian features
adminDashboardRouter.put(
  "/dashboard/update-users/:id",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      await UpdateVeterinarianAccount(req);
    } catch (err) {
      console.error("Error updating employee data: ", err);
      res.status(500).send("Internal server error");
    }
  }
);

// admin put update users features
adminDashboardRouter.put(
  "/dashboard/update-users/:id",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).send("No data sent to the server.");
      }
      await UpdateEmployeeAccount(req);
    } catch (err) {
      console.error("Error updating employee data: ", err);
      res.status(500).send("Internal server error");
    }
  }
);

// admin put update services features
adminDashboardRouter.put(
  "/modifier-services/:id",
  checkAuthenticated,
  checkRole("admin"),
  upload.single("images"),
  async (req, res) => {
    try {
      console.log(req.body);
      console.log(req.file);
      await updateServices(req);
      res.redirect("/admin/services");
    } catch (err) {
      console.error("Error updating services data: ", err);
      res.status(500).send("Internal server error");
    }
  }
);

//admin update habitat feature
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

//admin update animal feature
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

//delete service
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

//delete Habitat feature
adminDashboardRouter.delete(
  "/habitats/:id",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      await deleteHabitat(req, res);
      res.redirect("/admin/habitats?success=habitatDeleted");
    } catch (err) {
      console.error("Error deleting habitat data: ", err);
      res.status(500).send("Internal server error");
    }
  }
);

//delete animal feature
adminDashboardRouter.delete(
  "/animal/:id",
  checkAuthenticated,
  checkRole("admin"),
  async (req, res) => {
    try {
      await deleteAnimal(req, res);
      res.redirect("/admin/animaux?success=animalDeleted");
    } catch (err) {
      console.error("Error deleting animal data: ", err);
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = adminDashboardRouter;
