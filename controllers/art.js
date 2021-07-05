const passport = require('passport')
const validator = require('validator')
const Art = require('../models/Art')
const viewer = require('viewerjs')
const cloudinary = require('../middleware/cloudinary')
const mailer = require('../middleware/nodeMailer')

require("dotenv").config({ path: "./config/.env" });

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
                series: req.body.series,
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
    },
    submitInquiry: async (req, res) =>{
        try {
            const name = req.body.name
            const email = req.body.email
            const message = req.body.message

            const piece = await Art.findById(req.params._id)
            
            const pieceName = piece.name
            const img = piece.images[0].url
            

            const info = await mailer.sendMail({
                to: `${process.env.Email}, ${email}`,
                subject: `${name} has a question about ${pieceName}`,
                html: `<h3>${name} asked a question about ${pieceName}!</h3>
                        <img src="${img}" alt="Event Photo" width="600" height="400">
                        <p>${message}</p>`
            })
            
            res.redirect('back')
        
        } catch (err) {
            console.log(err)
        }
    }, 
    updateText: async (req, res)=>{
        try {
            console.log(req.body.name)
            await Art.findOneAndUpdate({_id: req.params._id}, {
                $set: {
                    name: req.body.name,
                    desc: req.body.desc,
                    link: req.body.link,
                    price: req.body.price,
                    series: req.body.series,
                }
            })
            res.redirect('back')
        } catch(err){
            console.log(err)
        }
    }, 
    markSold: async (req, res)=>{
        try {
            await Art.findOneAndUpdate({_id: req.params._id}, {
                $set: {
                    sold: true,
                }
            })

            res.redirect('back')
        } catch(err) {
            console.log(err)
        }
    },
    markUnsold: async (req, res) =>{
        try {
            await Art.findOneAndUpdate({_id: req.params._id}, {
                $set: {
                    sold: false,
                }
            })

            res.redirect('back')
        } catch(err) {
            console.log(err)
        }
    }, 
    addPhotos: async (req, res)=>{
        try {
            let images = []
            let files = req.files

            for (let i=0; i<files.length; i++){
                const result = await cloudinary.uploader.upload(files[i].path)

                images.push({url: result.secure_url, cloudinaryID: result.public_id})
            }

            await Art.findOneAndUpdate({_id: req.params._id}, {
                $addToSet: {
                    images: images,
                }
            })

            res.redirect('back')
        } catch(err) {
            console.log(err)
        }
    },
    deletePhoto: async (req, res)=>{
        try {
            await cloudinary.uploader.destroy(req.params._imgID)
            await Art.findOneAndUpdate({_id: req.params._id}, {
                $pull: {
                    images: {cloudinaryID: req.params._imgID}
                }
            })

            res.redirect('back')
        } catch(err) {
            console.log(err) 
        }
    }
}