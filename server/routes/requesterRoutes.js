const express = require('express');
const db = require('../util/database');

router = express.Router();

router.get('/requesters', (req, res, next) => {
    db.query("SELECT * FROM ROLE WHERE ROLE='requester'", (err, rest) => {
        if (err) {
            res.statusMessage = err.message;
            console.log("Status Code: 500"); //Internal Server Error
            res.status(500).json({ "statusText": err.message });
        }
        else {
            console.log('Status Code: 200');  //Login Successfull
            let resData = rest.rows;
            res.status(200).json(JSON.stringify(resData.rows)).end();
        }
    });
});


router.post('/new', (req, res, next) => {
    const { productId, approverId, activeUserMail, requesterNote } = req.body;
    db.query("SELECT user_id FROM ROLE WHERE EMAIL=$1", [activeUserMail], (err, res1) => {
        if (err) {
            res.statusMessage = "Internal Server Error";
            console.log("Status Code: 500"); //Internal Server Error
            res.status(500).json({ "statusText": "Internal Server Error" });
        } else {

            db.query('SELECT * FROM REQUEST', (err, allRequest) => {

                if (err) {
                    res.statusMessage = "Internal Server Error";
                    console.log("Status Code: 500"); //Internal Server Error
                    res.status(500).json({ "statusText": "Internal Server Error" });
                } else {
                    let ret = allRequest.rows.length + 1;
                    ret = '' + ret;
                    if (ret.length == 1)
                        ret = '100' + ret;
                    else if (ret.length == 2)
                        ret = '10' + ret;
                    else if (ret.length == 3)
                        ret = '1' + ret;


                    db.query('INSERT INTO REQUEST VALUES($1,$2,$3,$4,$5) RETURNING *', [ret, productId, res1.rows[0].user_id, approverId, requesterNote], (err, res2) => {
                        if (err) {
                            console.log("Status Code: 500"); //Internal Server Error
                            res.status(500).json({ "statusText": "Internal Server Error" });
                        } else {
                            // ** ADDING REQUEST IN REQUEST_STATUS TABLE with STATUS = ACTIVE**

                            console.log(res2.rows[0].request_id);
                            let request_id = res2.rows[0].request_id;

                            db.query('INSERT INTO REQUEST_STATUS VALUES($1,$2)', [request_id, "active"], (err, res3) => {
                                if (err) {
                                    res.statusMessage = err.message;
                                    console.log("Status Code: 500"); //Internal Server Error
                                    res.status(500).json({ "statusText": "Internal Server Error" });
                                } else {
                                    console.log("Status Code: 200"); // Request Submitted Successfully
                                    res.status(200).json({ "statusText": "Request Submitted Successfully" }).end();
                                }
                            });
                        }
                    });
                }
            });
        }
    })
});

module.exports = router;