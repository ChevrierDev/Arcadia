const jwt = require('jsonwebtoken');
require('dotenv').config( { path: '../../../.env'} )

//middleware who check if user authenticated
function checkAuthenticated(req, res, next) {
    console.log("Raw cookie header:", req.headers.cookie);  
    const token = req.cookies.token;
    console.log("Token from cookie-------------------------------------------------------->", token);

    if (!token) {
        console.log("No token found, redirecting to home.");
        return res.redirect('/accueil');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token from decoded--------------------------------------------------->", decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.log("Error verifying token: ", err.message);
        res.redirect('/accueil');
    }
}


//middleware who check each role before redirection
function checkRole(role) {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            next();
        } else {
            res.redirect('/accueil'); 
        }
    };
}

module.exports = { checkAuthenticated, checkRole };