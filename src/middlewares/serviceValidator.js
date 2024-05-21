const { body, validationResult } = require("express-validator");

//defines rules to validate services form input
const serviceRules = () => {
  return [
    body("name")
      .isString()
      .notEmpty()
      .withMessage("Vous devez entrer un nom.")
      .isLength({ min: 10, max: 500 })
      .escape(),
    body("description")
      .isString()
      .notEmpty()
      .withMessage("Vous devez entrer une description.")
      .isLength({ min: 10, max: 500 })
      .escape(),
  ];
};

const validateService = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);
    req.flash("error_msg", errorMessages);
    return res.redirect(req.body.redirectTo || "/");
  }
  next();
};

module.exports = {
  serviceRules,
  validateService,
};
