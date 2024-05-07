const { body, validationResult } = require("express-validator");

const animalRules = () => {
  return [
    body("name")
      .isString()
      .notEmpty()
      .withMessage("Value must be a string.")
      .isLength({ min: 5, max: 10 })
      .trim()
      .escape(),
    body("race")
      .isString()
      .notEmpty()
      .withMessage("Value must be a string.")
      .isLength({ min: 5, max: 50 })
      .trim()
      .escape(),
    body("etat")
      .isString()
      .notEmpty()
      .withMessage("Value must be a string.")
      .isLength({ min: 5, max: 250 })
      .trim()
      .escape(),
  ];
};

const validateAnimal = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  animalRules,
  validateAnimal,
};
