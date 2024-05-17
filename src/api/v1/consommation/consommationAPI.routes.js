const express = require("express");
const consommationAPIRouter = express.Router();
const {
  getconsommations,
  getconsommationByID,
  postconsommation,
  deleteConsommation,
} = require("../../../controllers/consommation/consommation.controllers");
const {   consommationRules, validateConsommation } = require('../../../middlewares/consommationValidator');
const { checkAuthenticated } = require('../../../middlewares/Autorisation/autorisation.middleware');


consommationAPIRouter.get('/', getconsommations);
consommationAPIRouter.get('/:id', getconsommationByID);
consommationAPIRouter.post('/',  consommationRules(), validateConsommation, postconsommation);
consommationAPIRouter.delete('/:id',   deleteConsommation);

module.exports = consommationAPIRouter;
