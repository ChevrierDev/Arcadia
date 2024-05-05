const express = require('express');
const serviceRouter = express.Router();

serviceRouter.get('/', (req, res) => {
    res.render('layouts/services', {
        title: "Découvrez tous nos services."
    })
});

module.exports = serviceRouter;