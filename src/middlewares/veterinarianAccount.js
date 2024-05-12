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
        // Check if it's an update operation and the email hasn't changed
        const id = req.params.id;
        if (id) {
          const existingVet = await db.query("SELECT * FROM veterinarian WHERE veterinarian_id = $1", [id]);
          if (existingVet.rows.length > 0 && existingVet.rows[0].email === value) {
            // Email hasn't changed in update, no need to check for existence
            return true;
          }
        }
        
        // Check for email existence in the case of new creation or email change in update
        const result = await db.query("SELECT EXISTS (SELECT 1 FROM veterinarian WHERE email = $1) AS email_exists", [value]);
        if (result.rows[0].email_exists) {
          throw new Error("This email address is already registered.");
        }
      })
      .trim(),
    body("password")
      .isString()
      .notEmpty()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{10,}$/)
      .withMessage(
        "The password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special symbol."
      )
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Your password does not correspond.');
        }
        return true; 
      })
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
