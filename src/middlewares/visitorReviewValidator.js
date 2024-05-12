const { body, validationResult } = require("express-validator");

const reviewRules = () => {
  return [
    body("pseudo")
      .isString()
      .notEmpty()
      .withMessage("You must enter a pseudo .")
      .isLength({ min: 5, max: 10 })
      .escape(),
    body("description")
      .isString()
      .notEmpty()
      .withMessage("You must enter a description name.")
      .isLength({ min: 5, max: 250 })
      .trim()
      .escape(),
    body("email")
      .isEmail()
      .notEmpty()
      .withMessage("You must enter an email.")
      .trim()
      .escape(),
  ];
};

const validateReview = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  reviewRules,
  validateReview,
};
