const express = require('express');
const adminDashboardRouter = express.Router();

const { checkAuthenticated, checkRole } = require('../../middlewares/Autorisation/autorisation.middleware')


//render admin dashboard
adminDashboardRouter.get('/dashboard', checkAuthenticated,  checkRole('admin'), (req, res) => {
    res.render('admin/adminDashboard', {
        title: "Votre espace personnel."
    })
});

module.exports = adminDashboardRouter;