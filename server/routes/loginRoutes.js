const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../util/database');

router = express.Router();

router.post('/login', (req, res, next) => {
    const { mail, pass } = req.body;
    db.query('SELECT * FROM ROLE WHERE EMAIL=$1', [mail], (err, rest) => {
        if (err) throw err;
        if (rest.rows[0] === undefined) {
            console.log('Status Code: -1'); //User Not Found
            res.json({ status: -1 });
        } else {
            bcrypt.compare(pass, rest.rows[0].password)
                .then(ret => {
                    if (ret) {
                        console.log('Status Code: 1'); //Login Successful
                        res.cookie('login', true);
                        res.cookie('user', mail);
                        res.json({ status: 1 });
                    } else {
                        console.log('Status code: 0'); //Wrong password
                        res.json({ status: 0 });
                    }
                });
        }
    });
});

module.exports = router;