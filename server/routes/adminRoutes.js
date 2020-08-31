const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../util/database');
const mailSend = require('../util/mail');
router = express.Router();

createID = (callback) => {
    db.query('SELECT * FROM ROLE', (err, res) => {
        let ret = res.rows.length + 1;
        ret = '' + ret;
        if (ret.length == 1)
            ret = '100' + ret;
        else if (ret.length == 2)
            ret = '10' + ret;
        else if (ret.length == 3)
            ret = '1' + ret;
        callback(ret);
    });
}

router.post('/create', (req, res, next) => {
    const { fname, lname, mail, role } = req.body;
    createID((randID) => {
        bcrypt.hash('Tcs#69@123', 12)
            .then(pass => {
                db.query('INSERT INTO ROLE VALUES($1,$2,$3,$4,$5,$6)', [randID, fname, lname, mail, pass, role], (err, rest) => {
                    if (err) {
                        res.send({ status: -1 });
                        throw err;
                    }
                    db.query('INSERT INTO ROLE_STATUS VALUES($1,$2)', [randID, 'active'], (err, rest) => {
                        if (err) {
                            res.send({ status: -1 });
                            throw err;
                        }
                        res.send({ status: 1 });
                        const body = 'You are now registered as ' + role + '. Please login with the following details:\nE-mail: ' + mail + '\nPassword: Tcs#69@123';
                        mailSend(mail, 'New user registered', body);
                    });
                });
            })
    })
});

router.post('/delete', (req, res, next) => {
    const { mail } = req.body;
    db.query('DELETE FROM ROLE WHERE EMAIL=$1', [mail], (err, rest) => {
        if (err) {
            res.send({ status: -1 });
            throw err;
        } else {
            db.query('DELETE FROM ROLE_STATUS WHERE EMAIL=$1', [mail], (err, rest) => {
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
    db.query('UPDATE ROLE_STATUS SET STATUS="inactive" WHERE USER_ID=?', [id], (err, rest) => {
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