const db = require("../../config/db");

//get all health record from DB
async function getHealthRecords(req, res) {
  try {
    const query = "SELECT * FROM health_record";
    const results = await db.query(query);

    if (results.rows.length <= 0) {
      res.status(400).send("No record found.");
      return;
    }
    res.send(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  }
}

//get record by it's ID
async function getHealthRecordsByID(req, res) {
  try {
    const id = req.params.id;
    
    const query = `SELECT * FROM health_record WHERE health_record_id = $1`;
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

//post new record
async function postHealthRecords(req, res) {
  try {
    const { content, detail_etat } = req.body;

    const query = "INSERT INTO health_record (date, content, detail_etat) VALUES (NOW(), $1, $2)";
    await db.query(query, [content, detail_etat]);

    res.send('record added.');

  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  };
};

//update record 
async function updateHealthRecords(req, res) {
  try {
    const {content, detail_etat } = req.body;
    const id = req.params.id;

    const query = "UPDATE health_record SET date=NOW(), content=$1, detail_etat=$2 WHERE health_record_id = $3";
    await db.query(query, [ content, detail_etat, id ]);

    res.send('Record successfully updated');
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  }
}

//delete record from DB
async function deleteHealthRecords(req, res) {
  try {
    const  id  = req.params.id;

    const existsQuery = "SELECT EXISTS(SELECT 1 FROM health_record WHERE health_record_id = $1)";
    const existsResult = await db.query(existsQuery, [id]);
    
    if (!existsResult.rows[0].exists) {
      res.status(404).send("Record with the specified ID does not exist.");
      return;
    }
    
    const query = "DELETE FROM health_record WHERE health_record_id = $1";
    await db.query(query, [ id ]);

    res.send('Record successfully deleted');
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  }
}

module.exports = {
  getHealthRecords,
  getHealthRecordsByID,
  postHealthRecords,
  updateHealthRecords,
  deleteHealthRecords,
};
