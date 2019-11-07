// npm modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGODB_URI = 'mongodb+srv://pj28105:helloapp@shopping-app-prjeu.mongodb.net/Shop';
const csrf = require('csurf');
const flash = require('connect-flash');

// Custom imports
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const shopRoutes = require('./routes/shop');
const defaultRoute = require('./controllers/error')
const User = require('./models/user');

app = express();

app.set('view engine', 'ejs');
// app.set('views','views');  //Not Required!
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});
app.use(
    session({ secret: 'secret', resave: false, saveUninitialized: false, store: store })
);

const CsrfProtection = csrf();
app.use(CsrfProtection);

app.use((req,res,next) =>{
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use(flash());

/******************Dummy User *********************/
app.use((req,res,next) => {
    if(!req.session.user){
        return next();
    }
    User.findById(req.session.user._id).then(user =>{
        req.user = user;
        next();
    }).catch(err => {
        console.log(err);
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

// 404 Page
app.use('/', defaultRoute);

mongoose.connect(MONGODB_URI).then(() => {
    console.log('Database Connected!');
    app.listen(3000);
}).catch(err => console.log(err));