const express = require('express');
const morgan = require('morgan');
http = require('http');

const loginRouter = require('./routes/loginRouter');

const hostname = 'localhost';
const port = 5000;

const app = express();

app.use(morgan('dev'));
app.use('/login', loginRouter);

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});