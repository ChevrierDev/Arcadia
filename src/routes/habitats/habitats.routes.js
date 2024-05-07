const express = require('express');
const habitatRouter = express.Router();

habitatRouter.get('/', (req, res) => {
    res.render('layouts/habitats', {
        title: "Découvrez nos habitats."
    })
});

module.exports = habitatRouter;