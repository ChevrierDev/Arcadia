const db = require("../../config/db");

//get all reviews  from DB
async function getReviews(req, res) {
  try {
    const query = "SELECT * FROM review";
    const results = await db.query(query);

    if (results.rows.length <= 0) {
      res.status(400).send("No review found.");
      return;
    }

    res.send(results.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  }
}

//get reviews by it's ID
async function getReviewByID(req, res) {
  try {
    const id = req.params.id;

    const query = `SELECT * FROM review WHERE review_id = $1`;
    const results = await db.query(query, [id]);

    if (results.rows.length === 0) {
      res.status(400).send("No review found.");
      return;
    }

    res.send(results.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  }
}

//post new review
async function postReview(req, res) {
  try {
    const { pseudo, description, email } = req.body;

    const query =
      "INSERT INTO review (pseudo, description, created_at, email) VALUES ($1, $2, NOW(), $3)";
    await db.query(query, [ pseudo, description, email ]);
    res.redirect('/accueil')
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  }
};

//update review
async function updateReview(req, res) {
  try {
    const { approved } = req.body;
    const id = req.params.id;

    const query =
      "UPDATE review SET  approved=$1 WHERE review_id = $2";
    await db.query(query, [ approved,  id]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  }
}

//delete record from DB
async function deleteReview(req, res) {
  try {
    const id = req.params.id;

    // const existsQuery =
    //   "SELECT EXISTS(SELECT 1 FROM review WHERE review_id = $1)";
    // const existsResult = await db.query(existsQuery, [id]);

    // if (!existsResult.rows[0].exists) {
    //   res.status(404).send("Review with the specified ID does not exist.");
    //   return;
    // }

    const query = "DELETE FROM review WHERE review_id = $1";
    await db.query(query, [id]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error !");
  }
}

module.exports = {
  getReviews,
  getReviewByID,
  postReview,
  updateReview,
  deleteReview,
};
