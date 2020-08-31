const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const loginRoutes = require('./routes/loginRoutes');
const schemaRoutes = require('./routes/schema');
const adminRoutes = require('./routes/adminRoutes');

app.use('/admin', adminRoutes);
app.use(loginRoutes);
app.use(schemaRoutes);

app.listen(PORT, console.log(`App running at PORT ${PORT}`));