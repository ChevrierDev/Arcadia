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

async function getHabitatByID(req) {
  try {
    const habitatId = req.params.id;
    const query = 'SELECT * FROM habitat WHERE habitat_id = $1';
    const { rows } = await db.query(query, [habitatId]);
    if (rows.length === 0) {
      throw new Error('Habitat not found');
    }
    return rows[0];
  } catch (error) {
    console.error('Error fetching habitat by ID:', error);
    throw error;
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
    const currentImageData = await db.query(
      "SELECT images FROM habitat WHERE habitat_id = $1",
      [id]
    );
    const currentImagePath = currentImageData.rows[0].images;
    // Update the habitat details in the database
    const query =
      "UPDATE habitat SET name = $1, description = $2, veterinarian_comment = $3, images = $4 WHERE habitat_id = $5";
    await db.query(query, [
      name,
      description,
      veterinarian_comment,
      newImagePath,
      id,
    ]);

    // If a new image was uploaded and there's an old image, delete the old image from the filesystem
    if (newImagePath && currentImagePath && newImagePath !== currentImagePath) {
      const fullPath = path.isAbsolute(currentImagePath)
        ? currentImagePath
        : path.join(__dirname, "..", "..", "..", currentImagePath);
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

//vet update comment habitat
async function vetUpdateHabitat(req, res) {
  try {
    const { id } = req.params;
    const { veterinarian_comment } = req.body; // Assuming only comment is editable

    // Fetch current data to prevent overwriting other fields with null
    const result = await db.query(
      "SELECT name, description, images FROM habitat WHERE habitat_id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      res.status(404).send("Habitat not found.");
      return;
    }
    const { name, description, images } = result.rows[0];

    // Update only the comment, keep other fields the same if not provided new values
    const query =
      "UPDATE habitat SET veterinarian_comment = $1 WHERE habitat_id = $2";
    await db.query(query, [
      veterinarian_comment || result.rows[0].veterinarian_comment,
      id,
    ]); // Use existing comment if not provided
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  }
}

// Delete a habitat
async function deleteHabitat(req, res) {
  try {
    const { id } = req.params;

    // Find the image associated with the habitat
    const queryFind = "SELECT images FROM habitat WHERE habitat_id = $1";
    const resultFind = await db.query(queryFind, [id]);

    // If the habitat does not exist, return a 404 error
    if (resultFind.rows.length === 0) {
      return res.status(404).send("Habitat with provided ID does not exist.");
    }

    const imagePath = resultFind.rows[0].images;

    // Delete the associated image if it exists
    if (imagePath) {
      const fullPath = path.isAbsolute(imagePath)
        ? imagePath
        : path.join(__dirname, "..", "..", "..", imagePath);

      try {
        await fs.unlink(fullPath);
      } catch (err) {
        if (err.code !== 'ENOENT') {
          console.error("Error while deleting image:", err);
          return res.status(500).send("Error while deleting image.");
        }
        console.warn("Image file not found, continuing deletion process:", err.path);
      }
    }

    // Find all animals associated with the habitat
    const queryFindAnimals = "SELECT animal_id FROM animal WHERE habitat_id = $1";
    const resultFindAnimals = await db.query(queryFindAnimals, [id]);

    // If there are animals associated with the habitat
    if (resultFindAnimals.rows.length > 0) {
      const animalIds = resultFindAnimals.rows.map(row => row.animal_id);

      // Delete health records associated with these animals
      const queryDeleteHealthRecords = "DELETE FROM health_record WHERE animal_id = ANY($1::int[])";
      await db.query(queryDeleteHealthRecords, [animalIds]);

      // Delete consumption records associated with these animals
      const queryDeleteConsumptionRecords = "DELETE FROM consommation WHERE animal_id = ANY($1::int[])";
      await db.query(queryDeleteConsumptionRecords, [animalIds]);

      // Delete the animals associated with the habitat
      const queryDeleteAnimals = "DELETE FROM animal WHERE habitat_id = $1";
      await db.query(queryDeleteAnimals, [id]);
    }

    // Delete the habitat
    await db.query("DELETE FROM habitat WHERE habitat_id = $1", [id]);
  } catch (err) {
    console.error("Error processing delete habitat:", err);
    if (!res.headersSent) { // Check if a response has already been sent
      res.status(500).send("Internal server error!");
    }
  }
}




module.exports = {
  getHabitats,
  getHabitatByID,
  postHabitat,
  vetUpdateHabitat,
  updateHabitat,
  deleteHabitat,
};
