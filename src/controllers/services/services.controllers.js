const db = require("../../config/db");
const fs = require("fs");

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

async function getServicesByID(req, res) {
  try {
    const service_id = req.params.id;

    const query = `SELECT * FROM service WHERE service_id = $1`;
    const results = await db.query(query, [service_id]);

    if (results.rows.length === 0) {
      res.status(404).send("The service with this provided ID does not exist");
      return;
    }

    res.send(results.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error !");
  }
}

async function postServices(req, res) {
  try {
    const { name, description } = req.body;
    const images = req.file;

    console.log(req.body);

    if (!images) {
      res.status(400).send("'You must upload an image.");
      return;
    }

    const imgData = fs.readFileSync(images.path);

    const query =
      "INSERT INTO service (name, description, images) VALUES ($1, $2, $3)";
    await db.query(query, [name, description, imgData]);

    fs.unlinkSync(images.path);

    res.send("New service added successfully.");
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
    const images = req.file;

    if (!images) {
      res.status(404).send("You must upload an image.");
      return;
    }

    const imgData = fs.readFileSync(images.path);

    const query =
      "UPDATE service SET name=$1, description=$2, images=$3 WHERE service_id = $4";
    await db.query(query, [name, description, imgData, id]);

    fs.unlinkSync(images.path);

    res.send("Service updated successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error !");
  }
}

//Delete a service services
async function deleteServices(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).send("You must enter a valid ID.");
      return;
    }
    const query = "DELETE FROM service WHERE service_id = $1";
    await db.query(query, [id]);

    res.status(200).send("Service successfully deleted.");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  }
}

module.exports = {
  getServices,
  getServicesByID,
  postServices,
  updateServices,
  deleteServices,
};
