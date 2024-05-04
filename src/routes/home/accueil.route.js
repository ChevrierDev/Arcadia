const express = require('express');
const accueilRouter = express.Router();

accueilRouter.get('/', (req, res) => {
    res.render('layouts/accueil', {
        title: "Page d'accueil"
    })
});

module.exports = accueilRouter;