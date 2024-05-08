const db = require("../../config/db");
const hashPassword = require("../../utils/passwordHash");

//look for all veterinarian
async function getVeterinarianAccount(req, res) {
  try {
    const query = "SELECT * FROM veterinarian";
    const results = await db.query(query);
    if (results.rows.length === 0) {
      res.status(404).send("There is no veterinarian registered.");
      return;
    }
    res.send(results.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error !");
  }
}

//look for specific veterinarian
async function getVeterinarianAccountByID(req, res) {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM veterinarian WHERE veterinarian_id = $1";
    const results = await db.query(query, [id]);
    if (results.rows.length === 0) {
      res.status(404).send("There is no veterinarian with this provided ID.");
      return;
    }
    res.send(results.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error !");
  }
}

//create veterinarian account
async function createVeterinarianAccount(req, res) {
  try {
    const { first_name, last_name, email, password } = req.body;
    const passwordHash = await hashPassword(password);
    const query =
      "INSERT INTO veterinarian (first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, 'vétérinaire')";
    await db.query(query, [first_name, last_name, email, passwordHash]);
    res.status(200).send("veterinarian account successfully created !");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error !");
  }
}

//Update veterinarian account
async function UpdateVeterinarianAccount(req, res) {
  try {
    const { first_name, last_name, email, password } = req.body;
    const { id } = req.params;
    const passwordHash = await hashPassword(password);
    const query =
      "UPDATE veterinarian SET first_name=$1, last_name=$2, email=$3, password=$4 WHERE veterinarian_id = $5";
    await db.query(query, [first_name, last_name, email, passwordHash, id]);
    res.status(200).send("veterinarian account successfully updated !");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error !");
  }
}

//Delete veterinarian account
async function deleteVeterinarianAccount(req, res) {
  try {
    const { id } = req.params;
    const query = "DELETE FROM veterinarian WHERE veterinarian_id = $1";
    await db.query(query, [id]);
    res.status(200).send("veterinarian account deleted !");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error !");
  }
}

module.exports = {
  getVeterinarianAccount,
  getVeterinarianAccountByID,
  createVeterinarianAccount,
  UpdateVeterinarianAccount,
  deleteVeterinarianAccount,
};
