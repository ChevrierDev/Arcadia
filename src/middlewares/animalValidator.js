const { body, validationResult } = require("express-validator");

const animalRules = () => {
  return [
    body("name")
      .isString()
      .notEmpty()
      .withMessage("Vous devez entrer un nom.")
      .isLength({ max: 15 })
      .withMessage("Vous ne pouvez pas dépassez 15 caratères.")
      .trim()
      .escape(),
    body("race")
      .isString()
      .notEmpty()
      .withMessage("Vous devez entrer une race.")
      .isLength({ max: 50 })
      .withMessage("Vous ne pouvez pas dépassez 50 caratères.")
      .trim()
      .escape(),
  ];
};


const validateAnimal = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);
    req.flash("error_msg", errorMessages);
    return res.redirect(req.body.redirectTo || "/");
  }
  next();
};

module.exports = {
  animalRules,
  validateAnimal,
};
