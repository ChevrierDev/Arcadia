const {
  getEmployeeAccountByID,
} = require("../controllers/employee/manageEmployeeAccount");

// get specific employee data
async function enrichUserWithInfo(req, res, next) {
  if (req.user && req.user.sub) {
    try {
      const fakeReq = { params: { id: req.user.sub } };
      const employeeInfo = await getEmployeeAccountByID(fakeReq);
      if (employeeInfo) {
        req.user.details = employeeInfo;
      } else {
        console.log("No employee found with the given ID");
      }
    } catch (err) {
      console.log("Failed to fetch employee details:", err);
      return res.status(500).send("Internal server error");
    }
  }
  next();
}

module.exports = enrichUserWithInfo;
