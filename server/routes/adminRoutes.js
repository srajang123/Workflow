const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../util/database');
const mailSend = require('../util/mail');
router = express.Router();

router.post('/create', (req, res, next) => {
    const { fname, lname, mail, role } = req.body;
    db.query('SELECT * FROM ROLE WHERE EMAIL=$1', [mail], (err, users) => {
        if (err) {
            console.log("Status Code: 500"); //Internal Server Error
            res.status(500).json({ "statusText": "Internal Server Error" });
        } else {
            if (users.rows.length == 0) {
                db.query('SELECT * FROM ROLE', (err, allUsers) => {
                    if (err) {
                        console.log("Status Code: 500"); //Internal Server Error
                        res.status(500).json({ "statusText": "Internal Server Error" });
                    } else {
                        let ret = allUsers.rows.length + 1;
                        ret = '' + ret;
                        if (ret.length == 1)
                            ret = '100' + ret;
                        else if (ret.length == 2)
                            ret = '10' + ret;
                        else if (ret.length == 3)
                            ret = '1' + ret;

                        bcrypt.hash('abcd@1234', 12)
                            .then(pass => {
                                db.query('INSERT INTO ROLE VALUES($1,$2,$3,$4,$5,$6)', [ret, fname, lname, mail, pass, role], (err, rest1) => {
                                    if (err) {
                                        console.log(err);
                                        console.log("Status Code: 500"); //Internal Server Error
                                        res.status(500).json({ "statusText": "Internal Server Error" });
                                    } else {
                                        db.query('INSERT INTO ROLE_STATUS VALUES($1,$2)', [ret, 'active'], (err, rest2) => {
                                            if (err) {
                                                console.log(err);
                                                console.log("Status Code: 500"); //Internal Server Error
                                                res.status(500).json({ "statusText": "Internal Server Error" });
                                            } else {
                                                console.log("Status Code: 201"); //User Successfully Created
                                                res.status(201).json({ "statusText": "User Successfully Created" });
                                                const body = 'You are now registered as ' + role + '. Please login with the following details:\nE-mail: ' + mail + '\nPassword: Tcs#69@123';
                                                mailSend(mail, 'New user registered', body);
                                            }
                                        });
                                    }
                                });
                            })
                    }
                });
            } else {
                console.log("Status Code: 403"); //User Already Exist
                res.status(403).json({ "statusText": "User Already Exist" });
            }
        }
    });
});

router.get('/get', (req, res, next) => {
    db.query('SELECT * FROM ROLE NATURAL JOIN ROLE_STATUS', (err, data) => {
        if (err) {
            console.log("Status Code: 500"); //Internal Server Error
            res.status(500).json({ "statusText": "Internal Server Error" });
        } else {
            console.log("Status Code: 200"); //Data Successfully Fetched
            res.status(200).json({ data: data.rows });
        }
    })
});

module.exports = router;