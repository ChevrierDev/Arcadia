const express = require("express");
const manageVeterinarianAPIRouter = express.Router();
const {
  getVeterinarianAccount,
  getVeterinarianAccountByID,
  createVeterinarianAccount,
  UpdateVeterinarianAccount,
  deleteVeterinarianAccount,
} = require("../../../controllers/veterinarian/createVeterinarian.controllers");
const {
  veterinarianRules,
  validateVeterinarian,
} = require("../../../middlewares/veterinarianAccount");

const { checkAuthenticated, checkRole } = require('../../../middlewares/Autorisation/autorisation.middleware');

manageVeterinarianAPIRouter.get("/",  getVeterinarianAccount);
manageVeterinarianAPIRouter.get("/:id", getVeterinarianAccountByID);
manageVeterinarianAPIRouter.post("/", veterinarianRules(), validateVeterinarian, createVeterinarianAccount);
manageVeterinarianAPIRouter.put("/:id", veterinarianRules(), validateVeterinarian, UpdateVeterinarianAccount);
manageVeterinarianAPIRouter.delete("/:id", deleteVeterinarianAccount);

module.exports = manageVeterinarianAPIRouter;
