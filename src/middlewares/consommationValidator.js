const { body, validationResult } = require("express-validator");

const consommationRules = () => {
  return [
    body("grammage")
      .isInt()
      .withMessage('Value must be a int.')
      .notEmpty()
      .withMessage("You must enter a consommation quantity.")
      .trim()
      .escape(),
  ];
};

const validateConsommation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
    next();
}

module.exports = {
  consommationRules,
  validateConsommation
}
