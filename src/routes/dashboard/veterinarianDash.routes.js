const express = require('express');
const veterinarianDashboardRouter = express.Router();

const { checkAuthenticated, checkRole } = require('../../middlewares/Autorisation/autorisation.middleware')


//render admin dashboard
veterinarianDashboardRouter.get('/dashboard', checkAuthenticated, checkRole('veterinarian'), (req, res) => {
    res.render('veterinarian/veterinarianDashboard', {
        title: "Votre espace vétérinaire."
    })
});

module.exports = veterinarianDashboardRouter;