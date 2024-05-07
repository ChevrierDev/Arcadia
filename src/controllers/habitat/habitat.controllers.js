const db = require("../../config/db");
const fs = require("fs");

//get all habitats
async function getHabitats(req, res) {
  try {
    const query = "SELECT * FROM habitat";
    const results = await db.query(query);

    if (results.rows.length <= 0) {
      res.status(400).send("No habitat found.");
      return;
    }
    res.send(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  }
}

async function getHabitatByID(req, res) {
  try {
    const id = req.params.id;

    const query = `SELECT * FROM habitat WHERE habitat_id = $1`;
    const results = await db.query(query, [id]);

    if (results.rows.length === 0) {
      res.status(404).send("The habitat with this provided ID does not exist");
      return;
    }

    res.send(results.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error !");
  }
}

async function postHabitat(req, res) {
  try {
    const { name, description, veterinarian_comment } = req.body;
    const images = req.file;

    console.log(req.body);

    if (!images) {
      res.status(400).send("You must upload an image.");
      return;
    }

    const imgData = fs.readFileSync(images.path);

    const query =
      "INSERT INTO habitat (name, description, veterinarian_comment, images) VALUES ($1, $2, $3, $4)";
    await db.query(query, [name, description, veterinarian_comment, imgData]);

    fs.unlinkSync(images.path);

    res.send("New Habitat added successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error !");
  }
}

//update a habitat
async function updateHabitat(req, res) {
  try {
    const { name, description, veterinarian_comment } = req.body;
    const  { id } = req.params
    const images = req.file;

    const imgData = fs.readFileSync(images.path);

    const query =
      "UPDATE habitat SET name=$1, description=$2, veterinarian_comment=$3, images=$4 WHERE habitat_id = $5";
    await db.query(query, [
      name,
      description,
      veterinarian_comment,
      imgData,
      id,
    ]);

    fs.unlinkSync(images.path);

    res.send("habitat updated successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error !");
  }
}

//Delete a habitat habitats
async function deleteHabitat(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).send("You must enter a valid ID.");
      return;
    }
    const query = "DELETE FROM habitat WHERE habitat_id = $1";
    await db.query(query, [id]);

    res.status(200).send("habitat successfully deleted.");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  }
}

module.exports = {
  getHabitats,
  getHabitatByID,
  postHabitat,
  updateHabitat,
  deleteHabitat,
};
