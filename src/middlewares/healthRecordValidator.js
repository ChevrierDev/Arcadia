const { body, validationResult } = require("express-validator");

const healthRecordRules = () => {
  return [
    body("content")
      .isString()
      .notEmpty()
      .withMessage("Value must be a string.")
      .isLength({ min: 5, max: 250 })
      .trim()
      .escape(),
    body("detail_etat")
      .isString()
      .notEmpty()
      .withMessage("Value must be a string.")
      .isLength({ min: 5, max: 250 })
      .trim()
      .escape(),
  ];
};

const validatehealthRecord = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  healthRecordRules,
  validatehealthRecord,
};
