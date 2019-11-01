// npm modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Custom imports
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const defaultRoute = require('./controllers/error')

app = express();

app.set('view engine', 'ejs');
// app.set('views','views');  //Not Required!
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 Page
app.use('/',defaultRoute);

app.listen(3000);