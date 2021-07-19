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
            const user = await User.find({email: req.body.email});
            if (!user[0]) {
                req.flash('error', 'No account with that email address exists.');
                return res.redirect('/admin/forgot');
            } else {
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000;
    
                const info = await mailer.sendMail({
                    to: user[0].email,
                    subject: 'Website Password Reset',
                    text: `
                        You are receiving this because you (or someone else) have requested the reset of the password for your account.
                        Please click on the following link, or paste this into your browser to complete the process:
                        http://${req.headers.host}/reset/${token}
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
            const user = users.find(u => (
                (u.resetPasswordExpires > Date.now()) &&
                crypto.timingSafeEqual(Buffer.from(u.resetPasswordToken), Buffer.from(req.params.token))
              ));
            
              if (!user) {
                req.flash('error', 'Password reset token is invalid or has expired.');
                return res.redirect('/forgot');
              }
            
              res.setHeader('Content-type', 'text/html');
              res.end(templates.layout(`
                ${templates.error(req.flash())}
                ${templates.resetPassword(user.resetPasswordToken)}
              `));
        } catch(err) {
            console.log(err)
        }
    }
}