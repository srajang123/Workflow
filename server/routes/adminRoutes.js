const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../util/database');
const mailSend = require('../util/mail');
router = express.Router();

createID = (callback) => {
    
}

router.post('/create', (req, res, next) => {
    const { fname, lname, mail, role } = req.body;

    db.query('SELECT * FROM ROLE WHERE EMAIL=$1',[mail], (err, users) => {
        console.log(users.rows.length);
        if(err) {
            console.log("Status Code: 500"); //Internal Server Error
            res.status(500).json({"statusText" : "Internal Server Error"});
        } else {
            console.log(users);
            if(users.rows.length==0) {
                db.query('SELECT * FROM ROLE', (err, allUsers) => {
                    if(err) {
                        console.log("Status Code: 500"); //Internal Server Error
                        res.status(500).json({"statusText" : "Internal Server Error"});
                    } else {
                        let ret = allUsers.rows.length + 1;
                        console.log(allUsers);
                        ret = '' + ret;
                        if (ret.length == 1)
                            ret = '100' + ret;
                        else if (ret.length == 2)
                            ret = '10' + ret;
                        else if (ret.length == 3)
                            ret = '1' + ret;

                        bcrypt.hash('Tcs#69@123', 12)
                        .then(pass => {
                            db.query('INSERT INTO ROLE VALUES($1,$2,$3,$4,$5,$6)', [ret, fname, lname, mail, pass, role], (err, rest1) => {
                                if (err) {
                                    console.log(err);
                                    console.log("Status Code: 500"); //Internal Server Error
                                    res.status(500).json({"statusText" : "Internal Server Error"});
                                } else {
                                    db.query('INSERT INTO ROLE_STATUS VALUES($1,$2)', [ret, 'active'], (err, rest2) => {
                                        if (err) {
                                            console.log(err);
                                            console.log("Status Code: 500"); //Internal Server Error
                                            res.status(500).json({"statusText" : "Internal Server Error"});
                                        } else {
                                            console.log("Status Code: 201"); //User Successfully Created
                                            res.status(201).json({"statusText" : "User Successfully Created"});
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
                res.status(403).json({"statusText" : "User Already Exist"});
            }
        }
    });
});

router.post('/delete', (req, res, next) => {
    const { id } = req.body;
    db.query('DELETE FROM ROLE_STATUS WHERE USER_ID=$1', [id], (err, rest) => {
        if (err) {
            res.send({ status: -1 });
            throw err;
        } else {
            db.query('DELETE FROM ROLE WHERE USER_ID=$1', [id], (err, rest) => {
                if (err) {
                    res.send({ status: -1 });
                    throw err;
                }
                res.send({ status: 1 });
            })
        }

    })
});

router.get('/get', (req, res, next) => {
    db.query('SELECT * FROM ROLE NATURAL JOIN ROLE_STATUS', (err, data) => {
        if (err) {
            res.send({ status: -1 });
            throw err;
        }
        res.send({ status: 1, data: data.rows });
    })
});
router.get('/switch/:id', (req, res, next) => {
    const { id } = req.params;
    db.query("UPDATE ROLE_STATUS SET STATUS='inactive' WHERE USER_ID=$1", [id], (err, rest) => {
        if (err) {
            res.send({ status: -1 });
            throw err;
        }
        res.send({ status: 1 });
    })
});
/* Status Codes
-1: unsuccessful
1: succeessful
*/

module.exports = router;