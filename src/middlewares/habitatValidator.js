const { body, validationResult } = require("express-validator");

//defines rules to validate habitat form input
const habitatRules = () => {
  return [
    body("name")
      .isString()
      .notEmpty()
      .withMessage('vous devez entrer un nom.')
      .isLength({ min:10, max:50 })
      .withMessage('vous devez entrer entre 10 et 50 caractère maximum.')
      .trim()
      .escape(),
    body("description")
      .isString()
      .notEmpty()
      .withMessage('vous devez entrer une description.')
      .isLength({ min:10, max:250 })
      .withMessage('vous devez entrer entre 10 et 250 caractère maximum.')
      .escape(),
    body("veterinarian_comment")
      .isString()
      .optional()
      .isLength({ min:10, max:250 })
      .withMessage('vous devez entrer entre 10 et 250 caractère maximum.')
      .escape(),
  ];
};


const validatehabitat = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);
    req.flash("error_msg", errorMessages);
    return res.redirect(req.body.redirectTo || "/");
  }
  next();
};
module.exports = {
  habitatRules,
  validatehabitat
};
