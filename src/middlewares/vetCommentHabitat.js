const { body, validationResult } = require("express-validator");

//defines rules to validate habitat form input
const habitatCommentRules = () => {
  return [
    body("veterinarian_comment")
      .isString()
      .notEmpty()
      .withMessage("vous devez entrer un commentaire.")
      .isLength({ min: 10, max: 250 })
      .withMessage("vous devez entrer entre 10 et 250 caractère maximum.")
      .escape(),
  ];
};

const validateCommenthabitat = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);
    req.flash("error_msg", errorMessages);
    return res.redirect(req.body.redirectTo || "/");
  }
  next();
};

module.exports = {
  habitatCommentRules,
  validateCommenthabitat,
};
