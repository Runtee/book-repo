const bcrypt = require('bcrypt')
const User = require('../models/user')


exports.home = (req, res) => {
    res.render('home',{pageTitle: 'home'})
}
exports.signinView = (req, res) => {
    res.render('signin', {
        errors: req.flash('sign in'),
        pageTitle: ''
    })
}

exports.login = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }, (error, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    req.session.userId = user._id// if passwords match
                    // // store user session
                    req.isAuthenticated = true
                    res.redirect('/')
                }
                else {
                    const validationErrors = ['login details, not correct']
                    req.flash('error', validationErrors)
                    res.redirect('/signin')
                }
            })
        }
        else {
            const validationErrors = ['login details, not correct']
            req.flash('error', validationErrors)
            res.redirect('/signin')
        }
    }
    )
}


exports.changePassword = async (req, res) => {
    const password = req.body.password;
    const newPassword = req.body.npassword;
    const Confirmpassword = req.body.cpassword;
    var id = req.session.userId
    bcrypt.hash(newPassword, 10, (e, newhash) => {
        User.findById(id, (error, user) => {
            if (user) {
                bcrypt.compare(password, user.password, (error, same) => {
                    if (same) {
                        if (newPassword === Confirmpassword) {
                            // var usr = bcrypt.hash(newPassword, 10)
                            User.findByIdAndUpdate(id, { 'password': newhash }, (err, upd) => {
                                if (upd) {
                                    req.flash('success', 'Password successfuly changed')
                                    res.redirect('/dashboard/changepassword')
                                }
                            });

                        }
                        else {
                            const validationErrors = ['confirm password is not the same with new password']
                            req.flash('error', validationErrors)
                            req.flash('data', req.body)
                            res.redirect('/dashboard/changepassword')

                        }
                    }
                    else {
                        const validationErrors = ['password is not correct']
                        req.flash('error', validationErrors)
                        req.flash('data', req.body)
                        res.redirect('/dashboard/changepassword')

                    }
                })

            }
            else{
                throw error
            }
        })
    })
}
exports.signupView = (req, res) => {
    res.render('signup', {
        errors: req.flash('error'),
        success: req.flash('success'),
        pageTitle: 'signup'

    }
    )
}

exports.signup = async (req, res, next) => {
    const { name, password, email } = req.body;
    const checkUser = await User.findOne({ email: email })
    if (checkUser) {
        req.flash('error', "email already exists")
        return res.redirect('/signup');
    }

    User.create({ name: name, password: password, email: email }, (error, user) => {
        if (error) {
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            req.flash('error', validationErrors)
            req.flash('data', req.body)
            return res.redirect('/signup');
        }
        else {
            req.flash('success', 'Successfully created an account')
            req.session.userId = user._id
            res.redirect('/upload');
        }
    }
    )
}

