const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for Animal
const animalSchema = new Schema({
  name: { type: String, required: true }, 
  visits: { type: Number, default: 0 }
});

// Create Animal model
const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
