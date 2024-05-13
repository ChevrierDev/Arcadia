const db = require("../../config/db");

//get all foods from DB
async function getFoods(req, res) {
  try {
    const query = "SELECT * FROM food";
    const results = await db.query(query);

    if (results.rows.length <= 0) {
      res.status(400).send("No foods found.");
      return;
    }
    res.send(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  }
}

//get food by it's ID
async function getFoodByID(req, res) {
  try {
    const id = req.params.id;

    const query = `SELECT * FROM food WHERE food_id = $1`;
    const results = await db.query(query, [id]);

    if (results.rows.length === 0) {
      res.status(400).send("No foods found.");
      return;
    }

    return results.rows[0];
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  }
}

//post new food
async function postFood(req, res) {
  try {
    const { name, type, quantity } = req.body;
    const query = "INSERT INTO food (name, type, quantity) VALUES ($1, $2, $3)";
    await db.query(query, [name, type, quantity]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  }
}

//update food
async function updateFood(req, res) {
  try {
    const { name, type, quantity } = req.body;
    const id = req.params.id;
    const query =
      "UPDATE food SET name=$1, type=$2, quantity=$3 WHERE food_id = $4";
    await db.query(query, [name, type, quantity, id]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  }
}

//delete food from DB
async function deleteFood(req, res) {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(404).send("You must enter a valid ID.");
      return;
    }

    const query = "DELETE FROM food WHERE food_id = $1";
    await db.query(query, [id]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  }
}

module.exports = {
  getFoods,
  getFoodByID,
  postFood,
  updateFood,
  deleteFood,
};
