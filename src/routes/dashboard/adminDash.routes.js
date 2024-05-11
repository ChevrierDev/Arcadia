const express = require("express");
const adminDashboardRouter = express.Router();
const nodemailer = require("nodemailer");

const {
  checkAuthenticated,
  checkRole,
} = require("../../middlewares/Autorisation/autorisation.middleware");
const {
  fetchEmployeeData,
  fetchVeterinarianData,
} = require("../../utils/apiClient");

const {
  createVeterinarianAccount,
  getVeterinarianAccountByID,
  UpdateVeterinarianAccount,
} = require("../../controllers/veterinarian/createVeterinarian.controllers");
const {
  getEmployeeAccountByID,
  UpdateEmployeeAccount,
  createEmployeeAccount,
} = require("../../controllers/employee/manageEmployeeAccount");

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

//admin render update-user employee features
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

//admin render update-vetfeature
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

// admin put update veterinarian features
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

module.exports = adminDashboardRouter;
