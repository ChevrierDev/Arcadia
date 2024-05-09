const express = require('express');
const logoutRouter = express.Router();

// deconnection routes
logoutRouter.post('/', (req, res) => {
    console.log("Déconnection wanted");
    res.clearCookie('token');
    res.redirect('/accueil');
});



module.exports = logoutRouter;
