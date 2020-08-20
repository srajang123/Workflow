const express = require('express');

router = express.Router();

router.post('/login', (req, res, next) => {
    console.table(req.body);
})

module.exports = router;