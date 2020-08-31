const express = require('express');
const db = require('../util/database');
// const { response } = require('express');

router = express.Router();

router.get('/requesters', (req, res, next) => {
    db.query("SELECT * FROM ROLE WHERE ROLE='requester'", (err, rest) => {
        if (err) {
            res.statusMessage = err.message;
            console.log("Status Code: 500"); //Internal Server Error
            res.status(500).json({"statusText" : err.message});
        }
        else {
            console.log('Status Code: 200');  //Login Successful
            let resData =  rest.rows;
            res.status(200).json(JSON.stringify(resData.rows)).end();
        }
    });
});

router.post('/new', (req, res, next) => {
    const { productId, approverId, activeUserMail, requesterNote } = req.body;
    db.query("SELECT user_id FROM ROLE WHERE EMAIL=$1",[activeUserMail], (err,res1) => {
        if(err) {
            res.statusMessage = err.message;
            console.log("Status Code: 500"); //Internal Server Error
            res.status(500).json({"statusText" : err.message});
        } else {
            db.query('INSERT INTO REQUEST(product_id, requester_id, approver_id, requester_comment) VALUES($1,$2,$3,$4) RETURNING *', [productId, res1.rows[0].user_id, approverId, requesterNote], (err,res2) => {
                if(err) {
                    res.statusMessage = err.message;
                    console.log("Status Code: 500"); //Internal Server Error
                    res.status(500).json({"statusText" : err.message});
                } else {
                    // ** ADDING REQUEST IN REQUEST_STATUS TABLE with STATUS = ACTIVE**
                    
                    console.log(res2.rows[0].request_id);
                    let request_id = res2.rows[0].request_id;
                    
                    db.query('INSERT INTO REQUEST_STATUS VALUES($1,$2)', [request_id, "active"], (err,res3) => {
                        if(err) {   
                            res.statusMessage = err.message;
                            console.log("Status Code: 500"); //Internal Server Error
                            console.log(err);
                            res.status(500).json({"statusText" : err.message});
                        } else {
                            console.log(res3);
                            res.status(200).json({"statusText" : "Request Submitted Succefully"}).end();        
                        }
                    });
                }
            });
        }
    })
});

module.exports = router;