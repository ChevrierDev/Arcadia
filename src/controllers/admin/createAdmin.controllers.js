const hashPassword = require('../../utils/passwordHash');
require("dotenv").config({ path:'../../../.env' });
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: 'localhost',
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT,
});

//create amdin account
async function createAdminAccount(email, password) {
    try {
        const passwordHash = await hashPassword(password);
        const query = "INSERT INTO admin (email, password, role) VALUES ($1, $2, 'admin')";
        await pool.query(query, [email, passwordHash]);
        console.log("Admin account successfully created !");
    } catch (err) {
        console.error("Error with admin account creation :", err);
    }
}

// use the command line to create admin account
const email = process.argv[3];
const password = process.argv[4];

if (!email || !password) {
    console.log('Please provide email and password');
} else {
    createAdminAccount(email, password);
};


