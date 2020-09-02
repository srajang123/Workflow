const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname,'../frontend','build')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());




const loginRoutes = require('./routes/loginRoutes');
const schemaRoutes = require('./routes/schema');
const adminRoutes = require('./routes/adminRoutes');
const products = require('./routes/products');
const approverRoutes = require('./routes/approverRoutes')
const requesterRoutes = require('./routes/requesterRoutes');
const requests = require('./routes/requests');

app.use('/admin', adminRoutes);
app.use(loginRoutes);
app.use(schemaRoutes);
app.use(products);
app.use(approverRoutes);
app.use(requesterRoutes);
app.use(requests);

app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname,"../frontend",'build','index.html'));
});

app.listen(PORT, console.log(`App running at PORT ${PORT}`));