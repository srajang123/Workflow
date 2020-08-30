const express = require('express');
const db = require('../util/database');

router = express.Router();

router.get('/approvers', (req, res, next) => {
    console.log("approvers");
    db.query("SELECT fname, lname, user_id FROM ROLE WHERE ROLE='approver' ORDER BY user_id ASC", (err, rest) => {
        if (err) {
            res.statusMessage = err.message;
            console.log("Status Code: 500"); //Internal Server Error
            res.status(500).json({"statusText" : err.message});
        }
        else {
            console.log('Status Code: 200');  //Login Successful
            let resData =  rest.rows;
            res.status(200).json(resData).end();
        }
    });
});

module.exports = router;