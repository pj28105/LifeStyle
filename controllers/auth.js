const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = undefined;
    }
    res.render('auth/login', { pageTitle: 'Login', errorMessage: message });
};

exports.postLogin = (req, res, next) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            req.flash('error', 'Invalid email or password!');
            return res.redirect('/login');
        } else {
            bcrypt.compare(req.body.password, user.password).then(doMatch => {
                if (doMatch) {
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    req.session.save((err) => {
                        console.log('Error while Logging in is-:', err);
                        res.redirect('/');
                    });
                } else {
                    req.flash('error', 'Invalid email or password!');
                    res.redirect('/login');
                }
            }).catch(err => {
                console.log(err);
                res.redirect('/invalid');
            });
        }
    }).catch(err => {
        console.log(err);
        res.redirect('/invalid');
    });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((error) => {
        console.log('Error while Logging out is-:', error);
        res.redirect('/');
    });
};

exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = undefined;
    }
    res.render('auth/signup', { pageTitle: 'Signup', errorMessage: message });
};

exports.postSignup = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            req.flash('error', 'Email already exists!');
            res.redirect('/signup');
        } else {
            bcrypt.hash(req.body.password, 12).then(enPassword => {
                const newUser = new User({
                    name: req.body.fullname,
                    email: req.body.email,
                    phone_num: req.body.phone_num,
                    address: req.body.address,
                    password: enPassword,
                    cart: { items: [] }
                });
                newUser.save().then(() => {
                    res.redirect('/login');
                });
            });
        }
    }).catch(err => {
        console.log(err);
        res.redirect('/invalid');
    })
};