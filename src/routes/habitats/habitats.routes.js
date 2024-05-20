const express = require("express");
const db = require('../../config/db');
const {
  fetchHealthReportData,
  fetchAnimalsData,
  fetchHabitatData,
} = require("../../utils/apiClient");

const { getHabitatByID } = require('../../controllers/habitat/habitat.controllers');

const decodeData = require("../../utils/decodeData");

const habitatRouter = express.Router();

// Route to render the habitats page
habitatRouter.get("/", async (req, res) => {
    try {
        const habitats = await fetchHabitatData();
        const decodedHabitats = decodeData(habitats);
        res.render("layouts/habitats", {
            title: "Découvrez nos habitats.",
            habitats: habitats,
        });
    } catch (err) {
        console.log(err)
        res.render("layouts/habitats", {
            title: "Découvrez nos habitats.",
            habitats: [],
        });
    }
});

// Route to render habitat details
habitatRouter.get("/:id", async (req, res) => {
  try {
      const habitatId = req.params.id;

      // Query to get animals with their most recent health report
      const animalsQuery = `
          SELECT 
              a.*, 
              hr.content AS recent_report,
              hr.date AS report_date
          FROM 
              animal a
          LEFT JOIN LATERAL (
              SELECT content, date
              FROM health_record hr
              WHERE hr.animal_id = a.animal_id
              ORDER BY hr.date DESC
              LIMIT 1
          ) hr ON true
          WHERE a.habitat_id = $1
      `;
      const { rows: animals } = await db.query(animalsQuery, [habitatId]);

      // Query to get habitat details
      const habitatQuery = `
          SELECT *
          FROM habitat
          WHERE habitat_id = $1
      `;
      const { rows: [habitat] } = await db.query(habitatQuery, [habitatId]);

      res.render("layouts/habitat-detail", {
          title: `Découvrez ${habitat.name}.`,
          animals,
          habitat
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
