const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animalSchema = new Schema({
  name: { type: String, required: true },
  visits: { type: Number, default: 0 }
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
