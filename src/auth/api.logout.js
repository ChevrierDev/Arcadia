const express = require('express');
const logoutRouter = express.Router();

// Handle logout request
logoutRouter.post('/', (req, res) => {
    console.log("Déconnection wanted");
    res.clearCookie('token'); // Clear the JWT cookie
    res.redirect('/accueil'); 
});

module.exports = logoutRouter;
