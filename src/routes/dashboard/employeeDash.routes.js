const express = require('express');
const employeeDashboardRouter = express.Router();

const { checkAuthenticated, checkRole } = require('../../middlewares/Autorisation/autorisation.middleware')


//render admin dashboard
employeeDashboardRouter.get('/dashboard', checkAuthenticated, checkRole('employee'), (req, res) => {
    res.render('employee/employeeDashboard', {
        title: "Votre espace employer."
    })
});

module.exports = employeeDashboardRouter;