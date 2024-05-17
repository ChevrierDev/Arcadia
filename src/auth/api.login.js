const express = require("express");
const loginRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../config/db");
const { loginRules, validateLogin } = require("../middlewares/loginValidator");

// Handle login request
loginRouter.post("/", loginRules(), validateLogin, async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    // Map user types to their respective database tables and ID columns
    const tableMap = {
      admin: { table: "admin", idColumn: "admin_id" },
      veterinarian: { table: "veterinarian", idColumn: "veterinarian_id" },
      employee: { table: "employee", idColumn: "employee_id" },
    };

    const userTable = tableMap[userType];
    const query = `SELECT * FROM ${userTable.table} WHERE email = $1`;
    const { rows } = await db.query(query, [email]);

    // Check if user exists
    if (rows.length === 0) {
      req.flash('error_msg_login', 'Utilisateur non trouvé.');
      return res.redirect("/accueil");
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    // Check if password matches
    if (!isMatch) {
      req.flash('error_msg_login', 'Mot de passe incorrect.');
      return res.redirect("/accueil");
    }

    // Create JWT payload
    const payload = {
      sub: user[userTable.idColumn],
      role: userType,
    };

    // Sign JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
      algorithm: "HS256",
    });

    // Set cookie with JWT
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
    });

    // Redirect based on user type
    switch (userType) {
      case "admin":
        res.redirect("/admin/dashboard");
        break;
      case "veterinarian":
        res.redirect("/veterinarian/dashboard");
        break;
      case "employee":
        res.redirect("/employee/dashboard");
        break;
      default:
        res.redirect("/accueil");
    }
  } catch (err) {
    console.log(err);
    req.flash("error_msg", "Erreur interne du serveur.");
    res.redirect("/accueil");
  }
});

module.exports = loginRouter;
