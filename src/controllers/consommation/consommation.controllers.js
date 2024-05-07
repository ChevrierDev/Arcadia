const db = require("../../config/db");

//get all consommations
async function getconsommations(req, res) {
  try {
    const query = "SELECT * FROM consommation";
    const results = await db.query(query);

    if (results.rows.length <= 0) {
      res.status(400).send("No consommation found.");
      return;
    };
    res.send(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  }
}

async function getconsommationByID(req, res) {
  try {
    const id = req.params.id;

    const query = `SELECT * FROM consommation WHERE consommation_id = $1`;
    const results = await db.query(query, [id]);

    if (results.rows.length === 0) {
      res.status(404).send("The consommation with this provided ID does not exist");
      return;
    }

    res.send(results.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error !");
  }
}

async function postconsommation(req, res) {
  try {
    const { grammage } = req.body;

    console.log(req.body);

    const query =
      "INSERT INTO consommation (date, heure, grammage) VALUES (CURRENT_DATE, CURRENT_TIME, $1)";
    await db.query(query, [grammage]);


    res.send("New consommation added successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error !");
  }
}


//Delete a consommation consommations
async function deleteConsommation(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(404).send("You must enter a valid ID.");
        return;
      }
  
      const existsQuery = "SELECT EXISTS(SELECT 1 FROM consommation WHERE consommation_id = $1)";
      const existsResult = await db.query(existsQuery, [id]);
      
      if (!existsResult.rows[0].exists) {
        res.status(404).send("Consommation with the specified ID does not exist.");
        return;
      }
  
      const deleteQuery = "DELETE FROM consommation WHERE consommation_id = $1";
      await db.query(deleteQuery, [id]);
  
      res.status(200).send("Consommation successfully deleted.");
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal server error!");
    }
  }
  

module.exports = {
  getconsommations,
  getconsommationByID,
  postconsommation,
  deleteConsommation,
};
