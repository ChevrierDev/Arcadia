const express = require("express");
const habitatAPIRouter = express.Router();
const {
  getHabitats,
  getHabitatByID,
  postHabitat,
  updateHabitat,
  deleteHabitat,
} = require("../../../controllers/habitat/habitat.controllers");
const {   habitatRules, validatehabitat } = require('../../../middlewares/habitatValidator');


habitatAPIRouter.get('/', getHabitats);
habitatAPIRouter.get('/:id', getHabitatByID);
habitatAPIRouter.post('/', habitatRules(), validatehabitat, postHabitat);
habitatAPIRouter.put('/:id', habitatRules(), validatehabitat, updateHabitat);
habitatAPIRouter.delete('/:id', deleteHabitat);

module.exports = habitatAPIRouter;
