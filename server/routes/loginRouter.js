const express = require('express');
const bodyParser = require('body-parser');

const loginRouter = express.Router();

loginRouter.use(bodyParser.json());

loginRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Get request on login route');
})
.post((req, res, next) => {
    res.end('Post request on user will add the user: ' + req.body.name + ' with details: ' + req.body.description);
})

module.exports = loginRouter;