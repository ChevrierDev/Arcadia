const { body, validationResult } = require("express-validator");

//defines rules to validate habitat form input
const habitatRules = () => {
  return [
    body("name")
      .isString()
      .optional()
      .isLength({ min:10, max:50 })
      .trim()
      .escape(),
    body("description")
      .isString()
      .optional()
      .isLength({ min:10, max:250 })
      .escape(),
    body("veterinarian_comment")
      .isString()
      .optional()
      .isLength({ min:10, max:250 })
      .escape(),
  ];
};

async function validatehabitat(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    next();

}

module.exports = {
  habitatRules,
  validatehabitat
};
