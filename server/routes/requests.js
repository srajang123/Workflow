const express = require('express');
const db = require('../util/database');

router = express.Router();

router.get('/active/:role/:mail', (req, res, next) => {
    db.query("SELECT user_id FROM ROLE WHERE EMAIL=$1", [req.params.mail], (err, res1) => {
        if (err) {
            res.statusMessage = err.message;
            console.log("Status Code: 500"); //Internal Server Error
            res.status(500).json({ "statusText": err.message });
        } else {
            const role = req.params.role;
            if (role === "requester") {
                db.query('SELECT * from REQUEST WHERE REQUESTER_ID=$1 and REQUEST_ID IN (SELECT REQUEST_ID from REQUEST_STATUS where STATUS=$2)', [res1.rows[0].user_id, "active"], (err, res2) => {
                    if (err) {
                        res.statusMessage = err.message;
                        console.log("Status Code: 500"); //Internal Server Error
                        res.status(500).json({ "statusText": err.message });
                    } else {
                        res.status(200).json(res2.rows);
                    }
                });
            } else {
                db.query('SELECT * from REQUEST WHERE APPROVER_ID=$1 and REQUEST_ID IN (SELECT REQUEST_ID from REQUEST_STATUS where STATUS=$2)', [res1.rows[0].user_id, "active"], (err, res2) => {
                    if (err) {
                        res.statusMessage = err.message;
                        console.log("Status Code: 500"); //Internal Server Error
                        res.status(500).json({ "statusText": err.message });
                    } else {
                        res.status(200).json(res2.rows);
                    }
                });
            }
        }
    });
});

router.get('/all/:role/:mail', (req, res, next) => {
    db.query("SELECT user_id FROM ROLE WHERE EMAIL=$1", [req.params.mail], (err, res1) => {
        if (err) {
            res.statusMessage = err.message;
            console.log("Status Code: 500"); //Internal Server Error
            res.status(500).json({ "statusText": err.message });
        } else {
            const role = req.params.role;
            if (role === "requester") {
                db.query('SELECT * from REQUEST WHERE REQUESTER_ID=$1', [res1.rows[0].user_id], (err, res2) => {
                    if (err) {
                        res.statusMessage = err.message;
                        console.log("Status Code: 500"); //Internal Server Error
                        res.status(500).json({ "statusText": err.message });
                    } else {
                        res.status(200).json(res2.rows);
                    }
                });
            } else {
                db.query('SELECT * from REQUEST WHERE APPROVER_ID=$1', [res1.rows[0].user_id], (err, res2) => {
                    if (err) {
                        res.statusMessage = err.message;
                        console.log("Status Code: 500"); //Internal Server Error
                        res.status(500).json({ "statusText": err.message });
                    } else {
                        res.status(200).json(res2.rows);
                    }
                });
            }
        }
    });
});

module.exports = router;