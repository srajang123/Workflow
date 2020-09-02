const express = require('express');
const db = require('../util/database');

router = express.Router();

router.get('/approvers', (req, res, next) => {
    console.log("approvers");
    db.query("SELECT fname, lname, user_id FROM ROLE WHERE ROLE='approver' ORDER BY user_id ASC", (err, rest) => {
        if (err) {
            res.statusMessage = err.message;
            console.log("Status Code: 500"); //Internal Server Error
            res.status(500).json({ "statusText": err.message });
        }
        else {
            console.log('Status Code: 200');  //Login Successful
            let resData = rest.rows;
            res.status(200).json(resData).end();
        }
    });
});

router.post('/approver/request/action', (req, res, next) => {
    const { status, requestId, approverNote } = req.body;
    console.log(status);
    console.log(requestId);
    console.log(approverNote);
    db.query("UPDATE REQUEST SET APPROVER_COMMENT=$1 WHERE REQUEST_ID=$2", [approverNote, requestId], (err, res1) => {
        if (err) {
            res.statusMessage = err.message;
            console.log("Status Code: 500"); //Internal Server Error
            res.status(500).json({ "statusText": err.message });
        } else {
            db.query("UPDATE REQUEST_STATUS SET STATUS=$1 WHERE REQUEST_ID=$2", [status, requestId], (err, res2) => {
                if (err) {
                    res.statusMessage = err.message;
                    console.log("Status Code: 500"); //Internal Server Error
                    res.status(500).json({ "statusText": err.message });
                } else {
                    console.log('Status Code: 201');  //Data Updated Successfully
                    res.status(201).json({ "statusText": "Data Updated Successfully" }).end();
                }
            });
        }
    });
})


module.exports = router;