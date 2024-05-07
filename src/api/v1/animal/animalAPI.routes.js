const express = require("express");
const animalAPIRouter = express.Router();
const {
  getAnimals,
  getAnimalByID,
  postAnimal,
  updateAnimal,
  deleteAnimal,
} = require("../../../controllers/animal/animal.controllers");
const {   animalRules, validateAnimal } = require('../../../middlewares/animalValidator');
const upload = require("../../../utils/multer.config");


animalAPIRouter.get('/', getAnimals);
animalAPIRouter.get('/:id', getAnimalByID);
animalAPIRouter.post('/',animalRules(), upload.single('images'), validateAnimal, postAnimal);
animalAPIRouter.put('/:id',animalRules(), upload.single('images'), validateAnimal, updateAnimal);
animalAPIRouter.delete('/:id', deleteAnimal);

module.exports = animalAPIRouter;
