const express = require("express");
const manageEmployeeAPIRouter = express.Router();
const {
  getEmployeeAccount,
  getEmployeeAccountByID,
  createEmployeeAccount,
  UpdateEmployeeAccount,
  deleteEmployeeAccount,
} = require("../../../controllers/employee/manageEmployeeAccount");
const {
  employeeRules,
  validateEmployee,
} = require("../../../middlewares/employeeAccount.validator");

manageEmployeeAPIRouter.get("/", getEmployeeAccount);
manageEmployeeAPIRouter.get("/:id", getEmployeeAccountByID);
manageEmployeeAPIRouter.post("/", employeeRules(), validateEmployee, createEmployeeAccount);
manageEmployeeAPIRouter.put("/:id", employeeRules(), validateEmployee,  UpdateEmployeeAccount);
manageEmployeeAPIRouter.delete("/:id", deleteEmployeeAccount);

module.exports = manageEmployeeAPIRouter;
