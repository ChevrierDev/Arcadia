const express = require("express");
const foodRouter = express.Router();
const {
  getFoods,
  getFoodByID,
  postFood,
  updateFood,
  deleteFood,
} = require("../../../controllers/food/food.controllers");
const {   foodRules, validateFood } = require('../../../middlewares/foodValidator')


foodRouter.get('/', getFoods);
foodRouter.get('/:id', getFoodByID);
foodRouter.post('/', foodRules(), validateFood, postFood);
foodRouter.put('/:id', foodRules(), validateFood, updateFood);
foodRouter.delete('/:id', deleteFood);



module.exports = foodRouter;
