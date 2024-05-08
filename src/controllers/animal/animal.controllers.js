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

    res.send(results.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  }
}

//post new Animal
async function postAnimal(req, res) {
  try {
    const { name, race, etat } = req.body;
    const { images } = req.file;

    const imgData = fs.readFileSync(images.path);

    const query = "INSERT INTO animal (name, race, images, etat) VALUES ($1, $2, $3, $4)";
    await db.query(query, [name, race, imgData, etat]);

    fs.unlinkSync(images.path);

    res.send('Animal added.');

  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  };
};

//update Animal 
async function updateAnimal(req, res) {
  try {
    const { name, race, etat } = req.body;
    const id = req.params.id;
    const { images } = req.file;

    const imgData = fs.readFileSync(images.path);

    const query = "UPDATE animal SET name=$1, race=$2, etat=$3, images=$4 WHERE Animal_id = $5";
    await db.query(query, [ name, race, etat, images, id ]);

    res.send('Animal successfully updated');
  } catch (err) {
    console.log(err);
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
    const results = await db.query(query, [ id ]);

    res.send('Animal successfully deleted');
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
