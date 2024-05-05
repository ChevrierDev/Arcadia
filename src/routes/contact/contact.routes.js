const express = require('express');
const contactRouter = express.Router();

contactRouter.get('/', (req, res) => {
    res.render('layouts/contact', {
        title: "Découvrez tous nos contacts."
    })
});

module.exports = contactRouter;