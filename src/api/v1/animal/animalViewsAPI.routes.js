const express = require('express');
const animalViewsRouter = express.Router();
const Animal = require('../../../models/animalViews.schema');

animalViewsRouter.get('/visit-animal/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const animal = await Animal.findOneAndUpdate(
      { name: name },
      { $inc: { visits: 1 } },
      { new: true }
    );
    res.json(animal);
  } catch (error) {
    console.error('Error increasing animal visit count:', error);
    res.status(500).send('Server error');
  }
});

router.get('/animal-stats', async (req, res) => {
    try {
      const animals = await Animal.find({}).sort({ visits: -1 });
      res.json(animals);
    } catch (error) {
      console.error('Error fetching animal stats:', error);
      res.status(500).send('Server error');
    }
  });

module.exports = animalViewsRouter;
