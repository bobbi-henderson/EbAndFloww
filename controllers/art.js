const passport = require('passport')
const validator = require('validator')
const Art = require('../models/Art')
const cloudinary = require('../middleware/cloudinary')

const isArtOrAuth = true
const isBlog = false

module.exports = {
    getAddArtForm: (req,res)=>{
        if(!req.user){
            res.redirect('/')
        } else {
            res.render('addArt.ejs', {isLoggedIn: req.isAuthenticated(), isArtOrAuth: isArtOrAuth, isBlog: isBlog})
        }
    }, 
    addArt: async (req,res)=>{
        try {
            let images = []
            let files = req.files

            for (let i=0; i<files.length; i++){
                const result = await cloudinary.uploader.upload(files[i].path)

                images.push({url: result.secure_url, cloudinaryID: result.public_id})
            }

            await Art.create({
                name: req.body.name,
                desc: req.body.desc,
                images: images,
                link: req.body.link,
                price: req.body.price,
                sold: (req.body.sold === 'on'),
            })

            res.redirect('/')
        } catch (err) {
            console.log(err)
        }
    },
    getArt: async (req, res) =>{
        try {
            const piece = await Art.findById(req.params._id)

            res.render('art.ejs', {piece: piece, isLoggedIn: req.isAuthenticated(), isArtOrAuth: isArtOrAuth, isBlog: isBlog})
        } catch (err) {
            console.log(err)
        }
    }
}