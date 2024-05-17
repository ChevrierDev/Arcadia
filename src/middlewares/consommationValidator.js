const { body, validationResult } = require("express-validator");

const consommationRules = () => {
  return [
    body("grammage")
      .isFloat({ gt: 0 })
      .withMessage('Le grammage doit être un nombre supérieur à zéro.')
      .notEmpty()
      .withMessage("Vous devez entrer une quantité.")
      .trim()
      .escape(),
  ];
};
const validateConsommation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg);
    req.flash('error_msg', errorMessages);
    return res.redirect(req.body.redirectTo || "/");
  }
  next();
};


module.exports = {
  consommationRules,
  validateConsommation
}
