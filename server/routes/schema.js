const express = require('express');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const db = require('../util/database');

router = express.Router();
router.get('/admin/schema/creation', (req, res, next) => {

    db.query('CREATE TABLE PRODUCTS(PROD_ID VARCHAR(5) PRIMARY KEY,NAME VARCHAR(100))', (err, rest) => {
        if (err) {
            console.log('Error in products creation');
            throw err;
        }
    });

    db.query('CREATE TABLE ROLE(USER_ID VARCHAR(5) PRIMARY KEY,FNAME VARCHAR(100),LNAME VARCHAR(100),EMAIL VARCHAR(100),PASSWORD VARCHAR(100),ROLE VARCHAR(100))', (err, rest) => {
        if (err) {
            console.log('Error in role creation');
            throw err;
        }
    });
    db.query('CREATE TABLE REQUEST(REQUEST_ID VARCHAR(5) PRIMARY KEY,PRODUCT_ID VARCHAR(5),REQUESTER_ID VARCHAR(5),APPROVER_ID VARCHAR(5) ,REQUESTER_COMMENT VARCHAR(500),APPROVER_COMMENT VARCHAR(500),FOREIGN KEY(PRODUCT_ID) REFERENCES PRODUCTS(PROD_ID),FOREIGN KEY(REQUESTER_ID) REFERENCES ROLE(USER_ID),FOREIGN KEY(APPROVER_ID) REFERENCES ROLE(USER_ID))', (err, rest) => {
        if (err) {
            console.log('Error in request creation');
            throw err;
        }
    });
    db.query('CREATE TABLE ROLE_STATUS(USER_ID VARCHAR(5),STATUS VARCHAR(100), FOREIGN KEY(USER_ID) REFERENCES ROLE(USER_ID))', (err, rest) => {
        if (err) {
            console.log('Error in role status creation');
            throw err;
        }
    });
    db.query('CREATE TABLE REQUEST_STATUS(REQUEST_ID VARCHAR(5),STATUS VARCHAR(100), FOREIGN KEY(REQUEST_ID) REFERENCES REQUEST(REQUEST_ID))', (err, rest) => {
        if (err) {
            console.log('Error in request status creation');
            throw err;
        }
    });
});
router.get('/admin/schema/data', (req, res, next) => {
    //creating dummy products

    db.query('INSERT INTO PRODUCTS VALUES($1,$2)', ['101', 'Laptop']);
    db.query('INSERT INTO PRODUCTS VALUES($1,$2)', ['102', 'Mobile']);
    db.query('INSERT INTO PRODUCTS VALUES($1,$2)', ['103', 'Keyboard']);
    db.query('INSERT INTO PRODUCTS VALUES($1,$2)', ['104', 'Mouse']);
    db.query('INSERT INTO PRODUCTS VALUES($1,$2)', ['105', 'Speaker']);
    
    //creating users
    
    bcrypt.hash('Mann@2108', 12)
        .then(rest => {
            db.query('INSERT INTO ROLE VALUES($1,$2,$3,$4,$5,$6)', ['1000', 'Mann', 'Gupta', 'srajan.t2@tcs.com', rest, 'admin']);
        })
    
    bcrypt.hash('Tcs#69@123', 12)
        .then(rest => {
            db.query('INSERT INTO ROLE VALUES($1,$2,$3,$4,$5,$6)', ['1001', 'Srajan', 'Gupta', 'srajan.t2@tcs.com', rest, 'admin']);
        });

    bcrypt.hash('Mann@2108', 12)
        .then(rest => {
        db.query('INSERT INTO ROLE VALUES($1,$2,$3,$4,$5,$6)', ['1002', 'Approver_FName', 'Approver_LName', 'approver@tcs.com', rest, 'approver']);
        });

    bcrypt.hash('Mann@2108', 12)
        .then(rest => {
            db.query('INSERT INTO ROLE VALUES($1,$2,$3,$4,$5,$6)', ['1003', 'Requester_FName', 'Requester_LName', 'requester@tcs.com', rest, 'requester']);
        });
})
module.exports = router;