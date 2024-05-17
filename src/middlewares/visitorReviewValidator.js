const { body, validationResult } = require("express-validator");

const reviewRules = () => {
  return [
    body("pseudo")
      .isString()
      .notEmpty()
      .withMessage("Le pseudo est requis et doit être une chaîne de caractères.")
      .isLength({ min: 5, max: 10 })
      .withMessage("Le pseudo doit contenir entre 5 et 10 caractères.")
      .escape(),
    body("description")
      .isString()
      .notEmpty()
      .withMessage("La description est requise et doit être une chaîne de caractères.")
      .isLength({ min: 5, max: 250 })
      .withMessage("La description doit contenir entre 5 et 250 caractères.")
      .trim()
      .escape(),
    body("email")
      .isEmail()
      .withMessage("Vous devez entrer un email valide.")
      .notEmpty()
      .withMessage("L'email est requis.")
      .trim()
      .escape(),
  ];
};

const validateReview = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg);
    console.log('Validation error log ----------------------->', errorMessages); 
    req.flash('error_msg_review', errorMessages);
    return res.redirect('/accueil');
  }
  next();
};

module.exports = {
  reviewRules,
  validateReview,
};
