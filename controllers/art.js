const passport = require('passport')
const validator = require('validator')
const Art = require('../models/Art')
const cloudinary = require('../middleware/cloudinary')

module.exports = {
    getAddArtForm: (req,res)=>{
        if(!req.user){
            res.redirect('/')
        } else {
            res.render('addArt.ejs', {isLoggedIn: req.isAuthenticated()})
        }
    }, 
}