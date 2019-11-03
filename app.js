// npm modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Custom imports
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const defaultRoute = require('./controllers/error')
const mongoConnect = require('./utils/database').mongoConnect;
const User = require('./models/user');
const getDb = require('./utils/database').getDb;
const mongoDb = require('mongodb');

app = express();

app.set('view engine', 'ejs');
// app.set('views','views');  //Not Required!
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/******************Dummy User *********************/
app.use((req, res, next) => {
    const db = getDb();
    db.collection('users').findOne({ _id: new mongoDb.ObjectID('5dbcf31ce7111851c0fd5223') }).then(user => {
        req.user = new User(user.username, user.email, user.phone_num, user.address, user._id, user.cart);
        next();
    }).catch(err => {
        console.log(err);
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 Page
app.use('/', defaultRoute);

mongoConnect(() => {
    app.listen(3000);
});