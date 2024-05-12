const db = require("../../config/db");
const fs = require("fs");
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

//update a service
async function updateServices(req, res) {
  try {
    const { name, description } = req.body;
    const { id } = req.params;
    const imagePath = req.file ? req.file.path : null;

    const query =
      "UPDATE service SET name=$1, description=$2, images=$3 WHERE service_id = $4";
    await db.query(query, [name, description, imagePath, id]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error !");
  }
}

//Delete a service services
async function deleteServices(req, res) {
  try {
    const { id } = req.params;
    const queryFind = "SELECT images FROM service WHERE service_id = $1";
    const resultFind = await db.query(queryFind, [id]);

    if (resultFind.rows.length === 0) {
      return res.status(404).send("Le service avec l'ID fourni n'existe pas.");
    }

    const imagePath = resultFind.rows[0].images;

    if (imagePath) {
      const fullPath = path.isAbsolute(imagePath)
        ? imagePath
        : path.join(__dirname, "..", "..", "..", imagePath);

      fs.unlink(fullPath, async (err) => {
        if (err) {
          console.error("Erreur lors de la suppression de l'image:", err);
          return res
            .status(500)
            .send("Erreur lors de la suppression de l'image.");
        }

        const queryDelete = "DELETE FROM service WHERE service_id = $1";
        try {
          await db.query(queryDelete, [id]);
        } catch (err) {
          console.error("Erreur lors de la suppression du service:", err);
          res.status(500).send("Erreur interne du serveur");
        }
      });
    } else {
      const queryDelete = "DELETE FROM service WHERE service_id = $1";
      try {
        await db.query(queryDelete, [id]);
        res.status(200).send("Service supprimé avec succès.");
      } catch (err) {
        console.error("Erreur lors de la suppression du service:", err);
        res.status(500).send("Erreur interne du serveur");
      }
    }
  } catch (err) {
    console.error("Erreur lors de la gestion de la suppression:", err);
    res.status(500).send("Erreur interne du serveur !");
  }
}

module.exports = {
  getServices,
  getServicesByID,
  postServices,
  updateServices,
  deleteServices,
};
