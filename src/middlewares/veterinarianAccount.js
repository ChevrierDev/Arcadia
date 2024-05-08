const { body, validationResult } = require("express-validator");
const db = require('../config/db');

//defines rules to validate veterinarian form input
const veterinarianRules = () => {
  return [
    body("first_name")
      .isString()
      .notEmpty()
      .withMessage("You must enter veterinarian first name.")
      .trim()
      .escape(),
    body("last_name")
      .isString()
      .notEmpty()
      .withMessage("You must enter veterinarian last name.")
      .escape(),
    body("email")
      .isEmail()
      .notEmpty()
      .withMessage("You must enter veterinarian email.")
      .isLength({ min: 10, max: 250 })
      .custom(async (value, { req }) => {
        // custom validation that look if email already register in the DB
        const query =
          "SELECT EXISTS (SELECT 1 FROM veterinarian WHERE email = $1) AS email_exists";
        const result = await db.query(query, [value]);
        const { email_exists } = result.rows[0];

        if (email_exists) {
          throw new Error("This email address is already registered.");
        }
      })
      .withMessage("Veterinarian with this adress already exist")
      .trim(),
    body("password")
      .isString()
      .notEmpty()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{10,}$/)
      .withMessage(
        "The password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special symbol."
      )
      .notEmpty()
      .trim(),
  ];
};

async function validateVeterinarian(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = {
  veterinarianRules,
  validateVeterinarian,
};
