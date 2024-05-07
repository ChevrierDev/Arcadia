const { body, validationResult } = require("express-validator");

//defines rules to validate services form input
const serviceRules = () => {
  return [
    body("name")
      .isString()
      .notEmpty()
      .withMessage("You must enter a name.")
      .trim()
      .escape(),
    body("description")
      .isString()
      .notEmpty()
      .withMessage("You must enter a description.")
      .escape(),
  ];
};

async function validateService(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}

module.exports = {
  serviceRules,
  validateService,
};
