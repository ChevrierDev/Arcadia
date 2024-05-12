const db = require("../../config/db");
const fs = require("fs");

//get all Animals from DB
async function getAnimals(req, res) {
  try {
    const query = "SELECT * FROM animal";
    const results = await db.query(query);

    if (results.rows.length <= 0) {
      res.status(400).send("No Animals found.");
      return;
    }
    res.send(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  }
}

//get Animal by it's ID
async function getAnimalByID(req, res) {
  try {
    const id = req.params.id;
    
    const query = `SELECT * FROM animal WHERE Animal_id = $1`;
    const results = await db.query(query, [id]);

    if (results.rows.length === 0) {
      res.status(400).send("No Animals found.");
      return;
    }

    return results.rows[0]
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  }
}

//post new Animal
async function postAnimal(req, res) {
  try {
    const { name, race, etat } = req.body;
    const imagePath = req.file ? req.file.path : null;
    const query = "INSERT INTO animal (name, race, images, etat) VALUES ($1, $2, $3, $4)";
    await db.query(query, [name, race, imagePath, etat]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  };
};

// Update a animal
async function updateAnimal(req, res) {
  try {
    const { name, race, etat } = req.body; 
    const { id } = req.params;
    let newImagePath = null;

    if (req.file) {
      newImagePath = req.file.path;
    }

    const currentImageData = await db.query("SELECT images FROM animal WHERE animal_id = $1", [id]);
    const currentImagePath = currentImageData.rows[0].images;


    const query = "UPDATE animal SET name = $1, race = $2, etat = $3, images = $4 WHERE animal_id = $5";
    await db.query(query, [name, race, etat, newImagePath, id]);

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


//delete Animal from DB
async function deleteAnimal(req, res) {
  try {
    const  id  = req.params.id;

    const existsQuery = "SELECT EXISTS(SELECT 1 FROM animal WHERE animal_id = $1)";
    const existsResult = await db.query(existsQuery, [id]);
    
    if (!existsResult.rows[0].exists) {
      res.status(404).send("animal with the specified ID does not exist.");
      return;
    }
    
    const query = "DELETE FROM animal WHERE Animal_id = $1";
    return await db.query(query, [ id ]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  }
}

module.exports = {
  getAnimals,
  getAnimalByID,
  postAnimal,
  updateAnimal,
  deleteAnimal,
};
