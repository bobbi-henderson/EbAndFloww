const { Router } = require('express')
const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const artController = require('../controllers/art')

router.get('/addArt', artController.getAddArtForm)
router.post('/addArt', upload.array('files', 4), artController.addArt)
router.get('/:_id', artController.getArt)
router.post('/inquiry/:_id', artController.submitInquiry)

module.exports = router