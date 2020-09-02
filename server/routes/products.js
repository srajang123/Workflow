const express = require('express');
const db = require('../util/database');

router = express.Router();

router.get('/products', (req, res, next) => {
    console.log("prodcuts");
    db.query('SELECT * FROM PRODUCTS ORDER BY prod_id ASC', (err, rest) => {
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

module.exports = router;