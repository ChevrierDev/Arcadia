const express = require('express');
const accueilRouter = express.Router();

accueilRouter.get('/', (req, res) => {
    res.render('layouts/accueil')
});

module.exports = accueilRouter;