const db = require("../../config/db");
const hashPassword = require("../../utils/passwordHash");

//look for all employees
async function getEmployeeAccount(req, res) {
  try {
    const query = "SELECT * FROM employee";
    const results = await db.query(query);
    if (results.rows.length === 0) {
      res.status(404).send("There is no employee registered.");
      return;
    }
    res.send(results.rows)
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error !");
  }
}

//look for specific employee
async function getEmployeeAccountByID(req, res) {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM employee WHERE employee_id = $1";
    const results = await db.query(query, [id]);
    if (results.rows.length === 0) {
      res.status(404).send("There is no employee with this provided ID.");
      return;
    }
    res.send(results.rows[0])
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error !");
  }
}

//create employee account
async function createEmployeeAccount(req, res) {
  try {
    const { first_name, last_name, email, password } = req.body;
    const passwordHash = await hashPassword(password);
    const query =
      "INSERT INTO employee (first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, 'employer')";
    await db.query(query, [first_name, last_name, email, passwordHash]);
    res.status(200).send("Employee account successfully created !");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error !");
  }
}

//Update employee account
async function UpdateEmployeeAccount(req, res) {
  try {
    const { first_name, last_name, email, password } = req.body;
    const {id} = req.params
    const passwordHash = await hashPassword(password);
    const query =
      "UPDATE employee SET first_name=$1, last_name=$2, email=$3, password=$4 WHERE employee_id = $5";
    await db.query(query, [ first_name, last_name, email, passwordHash, id ]);
    res.status(200).send("Employee account successfully updated !");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error !");
  }
}

//Delete employee account
async function deleteEmployeeAccount(req, res) {
  try {
    const { id } = req.params;
    const query = "DELETE FROM employee WHERE employee_id = $1";
    await db.query(query, [id]);
    res.status(200).send("Employee account deleted !");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error !");
  }
}

module.exports = {
  getEmployeeAccount,
  getEmployeeAccountByID,
  createEmployeeAccount,
  UpdateEmployeeAccount,
  deleteEmployeeAccount,
};
