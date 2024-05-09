const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require("dotenv").config({ path: '../../.env' });;
const db = require('../config/db')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    algorithms: ['HS256'],
};

const configureJwtStrategy = (passport) => {
    passport.use(new JwtStrategy(options, async (jwt_payload, done) =>{
        try {
            let userTable = {
                admin: 'admin',
                veterinarian: 'veterinarian',
                employee: 'employee'
            }[jwt_payload.role];

            const query = `SELECT * FROM ${userTable} WHERE ${userTable}_id = $1`;
            const { rows } = await db.query(query, [jwt_payload.sub]);
            
            if (rows.length > 0) {
                return done(null, rows[0]);
            } else {
                return done(null, false);
            }

        } catch (err) {
            console.log(err);
            return done(err, false);
        }
    }));
};

module.exports = configureJwtStrategy;
