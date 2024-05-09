const express = require('express');
const adminDashboardRouter = express.Router();

//render admin dashboard
adminDashboardRouter.get('/dashboard', (req, res) => {
    res.render('admin/adminDashboard', {
        title: "Votre espace personnel."
    })
});

module.exports = adminDashboardRouter;