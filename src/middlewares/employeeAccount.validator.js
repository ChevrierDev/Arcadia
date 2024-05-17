const { body, validationResult } = require("express-validator");
const db = require("../config/db");

//defines rules to validate employee form input
const employeeRules = () => {
  return [
    body("first_name")
      .isString()
      .notEmpty()
      .withMessage("Vous devez entrer un prénom.")
      .trim()
      .escape(),
    body("last_name")
      .isString()
      .notEmpty()
      .withMessage("Vous devez entrer un nom")
      .escape(),
    body("email")
      .isEmail()
      .notEmpty()
      .withMessage("Vous devez entrer un email")
      .isLength({ min: 10, max: 250 })
      .custom(async (value, { req }) => {
        // custom validation that look if email already register in the DB
        const query =
          "SELECT EXISTS (SELECT 1 FROM employee WHERE email = $1) AS email_exists";
        const result = await db.query(query, [value]);
        const { email_exists } = result.rows[0];

        if (email_exists) {
          throw new Error("This email address is already registered.");
        }
      })
      .withMessage("Un employer avec cette adresse email existe déjà.")
      .trim(),
    body("password")
      .isString()
      .notEmpty()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{10,}$/)
      .withMessage(
        "Votre mot de passe doit contenir au moins 10 caractères, avec au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial."
      )
      .notEmpty()
      .trim(),
    body("confirmPass")
      .isString()
      .notEmpty()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Your password does not correspond.");
        }
        return true;
      })
      .withMessage("Votre mot de passe ne correspond pas."),
  ];
};

const validateEmployee = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);
    req.flash("error_msg", errorMessages);
    return res.redirect(req.body.redirectTo || "/");
  }
  next();
};


module.exports = {
  employeeRules,
  validateEmployee,
};
