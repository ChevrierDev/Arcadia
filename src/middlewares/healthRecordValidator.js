const { body, validationResult } = require("express-validator");
const {getAnimalByID} = require('../controllers/animal/animal.controllers')

const healthRecordRules = () => {
  return [
    body("content")
      .isString()
      .notEmpty()
      .withMessage("Vous devez écrire un rapport.")
      .isLength({ min: 5, max: 250 })
      .withMessage("Vous devez écrire entre 5 et 250 caractère maximum.")
      .trim()
      .escape(),
    body("detail_etat")
      .isString()
      .notEmpty()
      .withMessage("Vous devez écrire un état.")
      .isLength({ min: 5, max: 250 })
      .withMessage("Vous devez écrire entre 5 et 250 caractère maximum.")
      .trim()
      .escape(),
    body("food_offered")
      .isString()
      .notEmpty()
      .withMessage("Vous devez écrire un un type de nourriture.")
      .isLength({ min: 5, max: 250 })
      .withMessage("Vous devez écrire entre 5 et 250 caractère maximum.")
      .trim()
      .escape(),
    body("food_amount")
      .isInt()
      .withMessage("La valeur doit être un entier.")
      .notEmpty()
      .withMessage("Vous devez écrire entre 5 et 250 caractère maximum.")
      .trim()
      .escape(),
  ];
};

const validatehealthRecord = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);
    req.flash("error_msg", errorMessages);
    if (req.user.role === "veterinarian") {
      return res.redirect(req.body.redirectTo || "/");
    }
  }
  next();
};

module.exports = {
  healthRecordRules,
  validatehealthRecord,
};
