const express = require('express');
const adminDashboardRouter = express.Router();
const nodemailer = require('nodemailer')


const { checkAuthenticated, checkRole } = require('../../middlewares/Autorisation/autorisation.middleware');
const { fetchEmployeeData, fetchVeterinarianData } = require('../../utils/apiClient');

const { createEmployeeAccount } = require('../../controllers/employee/manageEmployeeAccount');
const { createVeterinarianAccount } = require('../../controllers/veterinarian/createVeterinarian.controllers')

//render admin dashboard
adminDashboardRouter.get('/dashboard', checkAuthenticated, checkRole('admin'), async (req, res) => {
    try {
        const employees = await fetchEmployeeData(); 
        const vets = await fetchVeterinarianData();
        res.render('admin/adminDashboard', {
            title: "Votre espace personnel",
            employees: employees,
            vets: vets,
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des employés: ", error);
        res.status(500).send("Erreur lors de la récupération des données des employés.");
    }
});

adminDashboardRouter.get('/dashboard/create-users', checkAuthenticated, checkRole('admin'), async (req, res) => {
    try {
        res.render('admin/createUserDash', {
            title: "Créer un utilisateur."
        })
    } catch (err) {
        console.log(err)
    }
});

// Pour créer un employé
adminDashboardRouter.post('/dashboard/create-employee', checkAuthenticated, checkRole('admin'), async (req, res) => {
    try {
        await createEmployeeAccount(req, res);
        res.redirect('/admin/dashboard?success=employeeCreated');
    } catch (err) {
        console.error("Error while creating employee : ", err);
        res.status(500).send("Internal server error");
    };
});

// Pour créer un vétérinaire
adminDashboardRouter.post('/dashboard/create-veterinarian', checkAuthenticated, checkRole('admin'), async (req, res) => {
    try {
        await createVeterinarianAccount(req, res);
        res.redirect('/admin/dashboard?success=veterinarianCreated');
    } catch (err) {
        console.error("Error while creating veterinarian : ", err);
        res.status(500).send("Internal server error");
    }
});





module.exports = adminDashboardRouter;