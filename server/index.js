const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
const loginRoutes = require('./routes/loginRoutes');
const schemaRoutes = require('./routes/schema');
const products = require('./routes/products');

app.use(loginRoutes);
app.use(schemaRoutes);
app.use(products);

app.listen(PORT, console.log(`App running at PORT ${PORT}`));