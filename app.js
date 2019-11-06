// npm modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Custom imports
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const defaultRoute = require('./controllers/error')
const User = require('./models/user');

app = express();

app.set('view engine', 'ejs');
// app.set('views','views');  //Not Required!
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/******************Dummy User *********************/
app.use((req, res, next) => {
    User.findById('5dc223ff7968c7281080b3a8').then(user => {
        req.user = user;
        next();
    }).catch(err => {
        console.log(err);
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 Page
app.use('/', defaultRoute);

mongoose.connect(
    'mongodb+srv://pj28105:helloapp@shopping-app-prjeu.mongodb.net/Shop?retryWrites=true&w=majority'
    ).then(() => {
        console.log('Database Connected!');
        // const newUser = User({
        //     name : 'Piyush Jain',
        //     email : 'piyushjain964349@gmail.com',
        //     phone_num : '9643496369',
        //     address : 'New Delhi',
        //     cart : { items : [] }
        // });
        // newUser.save();
        app.listen(3000);
    }).catch(err => console.log(err));