const passport = require('passport')
const validator = require('validator')
const User = require('../models/Admin')
const mailer = require('../middleware/nodeMailer')
const { promisify } = require('util');
const crypto = require('crypto');

const isArtOrAuth = true
const isBlog = false

module.exports = {
    getAdmin: async (req, res) =>{
        if(!req.user) {
            res.redirect('/admin/login')
        } else {
            res.redirect('/')
        }
    },
    getLogin: async (req, res) => { 
        try {
            if (req.user) {
                return res.redirect('/admin')
            }
            res.render('login.ejs', {isLoggedIn: req.isAuthenticated(), isArtOrAuth: isArtOrAuth, isBlog: isBlog})
        } catch (err) {
            console.log(err)
        }
    },
    postLogin: (req, res, next) => {
        const validationErrors = []
        if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
        if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
        
        if (validationErrors.length) {
            req.flash('errors', validationErrors)
            return res.redirect('/login')
        }
        req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
        
        passport.authenticate('local', (err, user, info) => {
            if (err) { return next(err) }
            if (!user) {
            req.flash('errors', info)
            return res.redirect('/login') 
            }
            req.logIn(user, (err) => {
            if (err) { return next(err) }
                req.flash('success', { msg: 'Success! You are logged in.' })
                res.redirect('/') 
            })
        })(req, res, next)
    },
    logout: (req, res) => {
            req.logout()
            req.session.destroy((err) => {
              if (err) console.log('Error : Failed to destroy the session during logout.', err)
              req.user = null
              res.redirect('/')
            })
    },
    getForgot: async (req, res) =>{
        if(req.user) {
            res.redirect('/')
        } else {
            res.render('forgot.ejs', {isLoggedIn: req.isAuthenticated(), isArtOrAuth: isArtOrAuth, isBlog: isBlog})
        }
    },
    postForgot: async (req, res) => {
        try {
            const token = (await promisify(crypto.randomBytes)(20)).toString('hex');
            const user = await User.findOne({email: req.body.email});
            if (!user) {
                req.flash('error', 'No account with that email address exists.');
                return res.redirect('/admin/forgot');
            } else {
                await User.findByIdAndUpdate({_id: user._id},{
                    $set: {
                        resetPasswordToken: token,
                        resetPasswordExpires: Date.now() + 3600000,
                    }
                })

                const info = await mailer.sendMail({
                    to: user.email,
                    subject: 'Website Password Reset',
                    text: `
                        You are receiving this because you (or someone else) have requested the reset of the password for your account.
                        Please click on the following link, or paste this into your browser to complete the process:
                        http://${req.headers.host}/admin/reset/${token}
                        If you did not request this, please ignore this email and your password will remain unchanged.
                    `,
                })
    
                req.flash('info', `An e-mail has been sent to ${user.email} with further instructions.`);
              
                res.redirect('/');
            }
        } catch(err) {
            console.log(err)
        }
    }, 
    getReset: async (req, res) => {
        try {
            const user = await User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gte: Date.now()}});
            
            if (!user) {
                req.flash('error', 'Password reset token is invalid or has expired.');
                return res.redirect('/forgot');
            }
            
            res.render('reset.ejs', {isLoggedIn: req.isAuthenticated(), isArtOrAuth: isArtOrAuth, isBlog: isBlog, token: user.resetPasswordToken})
        } catch(err) {
            console.log(err)
        }
    }, 
    postReset: async (req, res) =>{
        try {
            const validationErrors = []
            if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
            if (req.body.password !== req.body.confirmPass) validationErrors.push({ msg: 'Passwords do not match' })
        
            if (validationErrors.length) {
                req.flash('errors', validationErrors)
                return res.redirect(`/admin/reset/${req.params.token}`)
            }

            const user = await User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gte: Date.now()}});
            
            await User.findOne({_id: user._id}, (err, currentUser) =>{
                currentUser.password = req.body.password

                currentUser.save((err) => {
                    if (err) { return next(err) }
                    req.logIn(user, (err) => {
                    if (err) {
                        return next(err)
                    }
                    res.redirect('/')
                    })
                })
            })

            await User.findOneAndUpdate({_id: user._id}, {
                $unset: {
                    resetPasswordToken: '',
                    resetPasswordExpires: ''
                }
            })

            const info = await mailer.sendMail({
                to: user.email,
                subject: 'Your password has been changed',
                text: `
                    This is a confirmation that the password for your account "${user.email}" has just been changed.
                `,
            })
            req.flash('success', `Success! Your password has been changed.`);
            res.redirect('/');
        } catch(err) {
            console.log(err)
        }
    }
}