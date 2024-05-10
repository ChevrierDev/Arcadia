const express = require('express');
const adminDashboardRouter = express.Router();


const { checkAuthenticated, checkRole } = require('../../middlewares/Autorisation/autorisation.middleware');
const { fetchEmployeeData, fetchVeterinarianData } = require('../../utils/apiClient')

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




module.exports = adminDashboardRouter;