const path = require("path");
const db = require("../../config/db");
const fs = require("fs").promises;

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

    return results.rows[0];
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error !");
  }
}

async function postHabitat(req, res) {
  try {
    const { name, description, veterinarian_comment } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const query =
      "INSERT INTO habitat (name, description, veterinarian_comment, images) VALUES ($1, $2, $3, $4)";
    await db.query(query, [name, description, veterinarian_comment, imagePath]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error !");
  }
}

// Update a habitat
async function updateHabitat(req, res) {
  try {
    const { name, description, veterinarian_comment } = req.body;
    const { id } = req.params;
    let newImagePath = null;

    // Check if a new image file was uploaded
    if (req.file) {
      newImagePath = req.file.path;
    }

    const currentImageData = await db.query("SELECT images FROM habitat WHERE habitat_id = $1", [id]);
    const currentImagePath = currentImageData.rows[0].images;

    // Update the habitat details in the database
    const query = "UPDATE habitat SET name = $1, description = $2, veterinarian_comment = $3, images = $4 WHERE habitat_id = $5";
    await db.query(query, [name, description, veterinarian_comment, newImagePath, id]);

    // If a new image was uploaded and there's an old image, delete the old image from the filesystem
    if (newImagePath && currentImagePath && newImagePath !== currentImagePath) {
      const fullPath = path.isAbsolute(currentImagePath) ? currentImagePath : path.join(__dirname, "..", "..", "..", currentImagePath);
      try {
        await fs.unlink(fullPath);
      } catch (err) {
        console.error("Failed to delete the old image:", err);
      }
    }

  } catch (err) {
    console.error("Error updating habitat:", err);
    res.status(500).send("Internal server error !");
  }
}

//Delete a habitat habitats
async function deleteHabitat(req, res) {
  try {
    const { id } = req.params;
    const queryFind = "SELECT images FROM habitat WHERE habitat_id = $1";
    const resultFind = await db.query(queryFind, [id]);

    if (resultFind.rows.length === 0) {
      return res.status(404).send("Habitat with provided ID does not exist.");
    }

    const imagePath = resultFind.rows[0].images;

    if (imagePath) {
      const fullPath = path.isAbsolute(imagePath)
        ? imagePath
        : path.join(__dirname, "..", "..", "..", imagePath);

      try {
        await fs.unlink(fullPath);
      } catch (err) {
        console.error("Error while deleting image:", err);
        return res.status(500).send("Error while deleting image.");
      }
    }
    await db.query("DELETE FROM habitat WHERE habitat_id = $1", [id]);
  } catch (err) {
    console.error("Error processing delete habitat:", err);
    if (!res.headersSent) { // Vérifie si une réponse a déjà été envoyée
      res.status(500).send("Internal server error !");
    }
  }
}

module.exports = {
  getHabitats,
  getHabitatByID,
  postHabitat,
  updateHabitat,
  deleteHabitat,
};
