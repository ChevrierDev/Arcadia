const { body, validationResult } = require("express-validator");

const foodRules = () => {
  return [
    body("name")
      .isString()
      .notEmpty()
      .withMessage("You must enter a food name.")
      .trim()
      .escape(),
    body("type")
      .isString()
      .notEmpty()
      .withMessage("You must enter a type name.")
      .trim()
      .escape(),
    body("quantity")
      .isInt()
      .withMessage('Value must be a int.')
      .notEmpty()
      .withMessage("You must enter a food quantity.")
      .trim()
      .escape(),
  ];
};

const validateFood = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }

  try {
    const { name, type, quantity } = req.body;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error !");
  }
}

module.exports = {
  foodRules,
  validateFood
}
