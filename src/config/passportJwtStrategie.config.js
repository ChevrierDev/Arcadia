const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require("dotenv").config({ path: '../../.env' });
const db = require('../config/db');

// JWT strategy options
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    algorithms: ['HS256'],
};

// Configure JWT strategy
const configureJwtStrategy = (passport) => {
    passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
        try {
            // Determine the user table based on the role
            const userTable = {
                admin: 'admin',
                veterinarian: 'veterinarian',
                employee: 'employee'
            }[jwt_payload.role];

            // Query to find the user by ID
            const query = `SELECT * FROM ${userTable} WHERE ${userTable}_id = $1`;
            const { rows } = await db.query(query, [jwt_payload.sub]);

            // If user is found, return user object
            if (rows.length > 0) {
                return done(null, rows[0]);
            } else {
                return done(null, false);
            }

        } catch (err) {
            console.error(err);
            return done(err, false);
        }
    }));
};

module.exports = configureJwtStrategy;
