const passport = require('passport')
const validator = require('validator')
const Blog = require('../models/blog')
const cloudinary = require('../middleware/cloudinary')
const mailer = require('../middleware/nodeMailer')

require("dotenv").config({ path: "./config/.env" });

const isArtOrAuth = false
const isBlog = true

module.exports = {
    getAddPost: (req,res)=>{
        if(!req.user){
            res.redirect('/')
        } else {
            res.render('addBlog.ejs', {isLoggedIn: req.isAuthenticated(), isArtOrAuth: isArtOrAuth, isBlog: isBlog})
        }
    }, 
    addPost: async (req,res)=>{
        try {
            console.log(req.file)
            const result = await cloudinary.uploader.upload(req.file.path)

            await Blog.create({
                title: req.body.title,
                image: result.secure_url,
                cloudinaryID: result.public_id,
                body: req.body.body,
                link: req.body.link
            })

            res.redirect('/')
        } catch (err) {
            console.log(err)
        }
    },
    getBlog: async (req,res)=>{
        try {
            const posts = await Blog.find()

            res.render('blog.ejs', {posts: posts, isLoggedIn: req.isAuthenticated(), isArtOrAuth: isArtOrAuth, isBlog: isBlog})
        } catch(err) {
            console.log(err)
        }
    },
    getBlogPost: async (req, res)=>{
        try {
            const post = await Blog.findById(req.params._id)

            res.render('blogPost.ejs', {post: post, isLoggedIn: req.isAuthenticated(), isArtOrAuth: isArtOrAuth, isBlog: isBlog})
        } catch(err) {
            console.log(err)
        }
    }, 
    updateText: async (req, res)=>{
        try {
            await Blog.findByIdAndUpdate({_id: req.params._id}, {
                $set: {
                    title: req.body.title,
                    body: req.body.body,
                    link: req.body.link
                }
            })

            res.redirect('back')
        } catch(err) {
            console.log(err)
        }
    }
}

