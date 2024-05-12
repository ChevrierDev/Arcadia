const db = require("../../config/db");
const fs = require("fs").promises;
const path = require("path");

//get all services
async function getServices(req, res) {
  try {
    const query = "SELECT * FROM service";
    const results = await db.query(query);

    if (results.rows.length <= 0) {
      res.status(400).send("No services found.");
      return;
    }
    res.send(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  }
}

async function getServicesByID(req) {
  const service_id = req.params.id;
  const query = `SELECT * FROM service WHERE service_id = $1`;
  const result = await db.query(query, [service_id]);
  
  if (result.rows.length === 0) {
    throw new Error("The service with this provided ID does not exist");
  }

  return result.rows[0];  
}

async function postServices(req, res) {
  try {
    const { name, description } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const query =
      "INSERT INTO service (name, description, images) VALUES ($1, $2, $3)";
    await db.query(query, [name, description, imagePath]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error !");
  }
}

// Update a service
async function updateServices(req, res) {
  try {
    const { name, description } = req.body;
    const { id } = req.params;

    // Get the current image path from the database
    const currentImageData = await db.query("SELECT images FROM service WHERE service_id = $1", [id]);
    const currentImagePath = currentImageData.rows[0].images;

    const newImagePath = req.file ? req.file.path : null;

    const query = "UPDATE service SET name = $1, description = $2, images = $3 WHERE service_id = $4";
    await db.query(query, [name, description, newImagePath, id]);

    // If a new image  uploaded, delete the old image from the filesystem
    if (newImagePath && currentImagePath && newImagePath !== currentImagePath) {
      const fullPath = path.isAbsolute(currentImagePath) ? currentImagePath : path.join(__dirname, "..", "..", "..", currentImagePath);
      try {
        await fs.unlink(fullPath);
      } catch (err) {
        console.error("Failed to delete the old image:", err);
      }
    }
  } catch (err) {
    console.error("Error updating service:", err);
    res.status(500).send("Internal server error !");
  }
}

//Delete a service services
async function deleteServices(req, res) {
  const { id } = req.params;
  try {
    const resultFind = await db.query("SELECT images FROM service WHERE service_id = $1", [id]);
    if (resultFind.rows.length === 0) {
      return res.status(404).send("Service with provided ID does not exist.");
    }

    const imagePath = resultFind.rows[0].images;
    if (imagePath) {
      const fullPath = path.isAbsolute(imagePath) ? imagePath : path.join(__dirname, '..', '..', '..', imagePath);

      try {
        await fs.unlink(fullPath);
      } catch (err) {
        if (err.code === 'ENOENT') {
          console.log("Image not found, it may have already been deleted:", fullPath);
        } else {
          throw err; // Rethrow if a different error occurred
        }
      }
    }

    await db.query("DELETE FROM service WHERE service_id = $1", [id]);
  } catch (err) {
    console.error("Error deleting service:", err);
    res.status(500).send("Internal server error.");
  }
}


module.exports = {
  getServices,
  getServicesByID,
  postServices,
  updateServices,
  deleteServices,
};
