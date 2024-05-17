const { body, validationResult } = require("express-validator");

const foodRules = () => {
  return [
    body("name")
      .isString()
      .notEmpty()
      .withMessage("Vous devez entrer un nom.")
      .trim()
      .escape(),
    body("type")
      .isString()
      .notEmpty()
      .withMessage("Vous devez entrer un type.")
      .trim()
      .escape(),
    body("quantity")
      .isInt({ min: 1 })
      .withMessage('La valeur doit être un entier supérieur à 1.')
      .notEmpty()
      .withMessage("Vous devez entrer une quantité.")
      .toInt(),
  ];
};


const validateFood = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);
    req.flash("error_msg", errorMessages);
    return res.redirect(req.body.redirectTo || "/");
  }
  next();
};



module.exports = {
  foodRules,
  validateFood
}
