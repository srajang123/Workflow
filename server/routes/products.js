const express = require('express');
const db = require('../util/database');

router = express.Router();

router.get('/products', (req, res, next) => {
    console.log("prodcuts");
    db.query('SELECT * FROM PRODUCTS', (err, rest) => {
        if (err) {
            res.statusMessage = err.message;
            console.log("Status Code: 500"); //Internal Server Error
            res.status(500).json({"statusText" : err.message});
        }
        else if (rest.rowCount=0) {
            console.log('Status Code: 403'); //User Not Found
            res.status(403).json({"statusText" : "User Not Found !"});
        } else {
            console.log('Status Code: 200');  //Login Successful
            let resData = {
                "products" : rest,
            };
            res.status(200).json(resData).end();
        }
    });
});

module.exports = router;