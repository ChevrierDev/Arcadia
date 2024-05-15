const express = require("express");
const {
  fetchHealthReportData,
  fetchAnimalsData,
  fetchHabitatData,
} = require("../../utils/apiClient");

const { getHabitatByID } = require('../../controllers/habitat/habitat.controllers');

const habitatRouter = express.Router();

habitatRouter.get("/", async (req, res) => {
  const habitats = await fetchHabitatData();
  res.render("layouts/habitats", {
    title: "Découvrez nos habitats.",
    habitats: habitats,
  });
});

// Render habitat detail
habitatRouter.get("/:id", async (req, res) => {
  try {
    const habitatId = req.params.id;
    const reports = await fetchHealthReportData();
    const animals = await fetchAnimalsData();
    const habitat = await getHabitatByID(req);

    // Filter animals by habitat_id
    const animalsInHabitat = animals.filter(animal => animal.habitat_id === parseInt(habitatId, 10));

    const animalsWithReports = animalsInHabitat.map(animal => {
      const report = reports.find(report => report.animal_id === animal.animal_id);
      return { ...animal, report };
    });

    res.render("layouts/habitat-detail", {
      title: `Découvrez ${habitat.name}.`,
      animals: animalsWithReports,
      habitat: habitat
    });
  } catch (err) {
    console.log(err);
    res.render("layouts/habitat-detail", {
      title: "Découvrez nos habitats.",
      animals: [],
      habitat: {}
    });
  }
});

module.exports = habitatRouter;
