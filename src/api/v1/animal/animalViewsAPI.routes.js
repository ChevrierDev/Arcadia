const express = require('express');
const Animal = require('../../../models/animalViews.schema');
const animalViewsRouter = express.Router();



// Increment the visit count for a specific animal
animalViewsRouter.get('/:name',async (req, res) => {
  const name = req.params.name;
  const animal = await Animal.findOneAndUpdate(
    { name: name },
    { $inc: { visits: 1 } },
    { new: true, upsert: true } // Create the document if it doesn't exist
  );
  res.json(animal);
});

// Get statistics of all animals sorted by visits in descending order
animalViewsRouter.get('/animal-stats',async (req, res) => {
  const animals = await Animal.find({}).sort({ visits: -1 });
  res.json(animals);
});

module.exports = animalViewsRouter;
