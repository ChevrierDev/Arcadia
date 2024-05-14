// routes/testRouter.js
const express = require('express');
const Animal = require('../../../models/animalViews.schema');
const testRouter = express.Router();

// Middleware to handle async errors
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Test route to simulate animal visit
testRouter.get('/simulate-visit/:name', asyncHandler(async (req, res) => {
  const name = req.params.name;
  const animal = await Animal.findOneAndUpdate(
    { name: name },
    { $inc: { visits: 1 } },
    { new: true, upsert: true } // Create the document if it doesn't exist
  );
  res.json(animal);
}));

module.exports = testRouter;
