const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../util/database');

router = express.Router();

router.post('/login', (req, res, next) => {
    const { mail, password } = req.body;

    db.query('SELECT * FROM ROLE WHERE EMAIL=$1', [mail], (err, rest) => {
        if (err) {
            rest.statusMessage = err.message;
            console.log("Status Code: 500"); //Internal Server Error
            res.status(500).json({ "statusText": err.message });
        }
        else if (rest.rows[0] === undefined) {
            console.log('Status Code: 403'); //User Not Found
            res.status(403).json({ "statusText": "User Not Found !" });
        } else {
            bcrypt.compare(password, rest.rows[0].password)
                .then(ret => {
                    if (ret) {
                        console.log('Status Code: 200');  //Login Successful
                        let resData = {
                            "login": true,
                            "role": rest.rows[0].role,
                            "mail": mail
                        };
                        res.status(201).json(resData);
                    } else {
                        console.log('Status Code: 403'); //Wrong password
                        res.status(403).json({ "statusText": "Invalid Password !" });
                    }
                    res.end();
                });
        }
    });
});

module.exports = router;