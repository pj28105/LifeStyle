const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');

const User = require('../models/user');

const transporter = nodemailer.createTransport(sendGridTransport(
    {
        auth: {
            api_key: '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'
        }
    }
));

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
                    console.log(req.body.email);
                    transporter.sendMail({
                        to: req.body.email,
                        from: 'piyushjain@shop.com',
                        subject: 'Sucessfully Signed Up!',
                        html: '<h1>Start Shopping !<h1>' 
                    }).catch(err => {
                        console.log(err);
                    });
                });
            });
        }
    }).catch(err => {
        console.log(err);
        res.redirect('/invalid');
    })
};