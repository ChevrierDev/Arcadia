const { body, validationResult } = require("express-validator");

const loginRules = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("Vous devez entrer un email valide.")
      .notEmpty()
      .withMessage("L'email est requis."),
    body("password")
      .isString()
      .notEmpty()
      .withMessage("Le mot de passe est requis.")
      .trim()
      .escape(),
  ];
};

const validateLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg);
    console.log('Validation error log ----------------------->', errorMessages); 
    req.flash('error_msg_login', errorMessages);
    return res.redirect('/accueil');
  }
  next();
};

module.exports = {
  loginRules,
  validateLogin
};
