const { Router } = require('express')
const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const blogController = require('../controllers/blog')

router.get('/addPost', blogController.getAddPost)
router.post('/addPost', upload.single('file'), blogController.addPost)
router.get('/', blogController.getBlog)
router.get('/:_id', blogController.getBlogPost)

module.exports = router