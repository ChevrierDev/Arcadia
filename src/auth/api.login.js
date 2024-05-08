const express = require('express');
const loginRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const db = require('../config/db');

loginRouter.post('/', async (req, res) => {
    const { email, password, userType } = req.body
    try {
        let tableMap = {
            admin: { table: 'admin', idColumn: 'admin_id' },
            veterinarian: { table: 'veterinarian', idColumn: 'veterinarian_id' },
            employee: { table: 'employee', idColumn: 'employee_id' }
        };

        let userTable = tableMap[userType];

        const query = `SELECT * FROM ${userTable.table} WHERE email = $1`;
        const { rows } = await db.query(query, [email]);

        if (rows.length === 0) {
            return res.status(404).send('User not found.');
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Incorrect Password.');
        }

        const payload = {
            sub: user[userTable.idColumn],
            role: userType
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.json({ token: `Bearer ${token}` });
        
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal server error !')
    }
});

module.exports = loginRouter;