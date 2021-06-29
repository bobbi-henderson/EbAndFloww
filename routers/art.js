const { Router } = require('express')
const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const artController = require('../controllers/art')

router.get('/addArt', artController.getAddArtForm)
router.post('/addArt', upload.array('files', 4), artController.addArt)
router.get('/:_id', artController.getArt)
router.post('/inquiry/:_id', artController.submitInquiry)
router.put('/updateText/:_id', artController.updateText)
router.put('/markSold/:_id', artController.markSold)
router.put('/markUnsold/:_id', artController.markUnsold)
router.put('/addPhotos/:_id', upload.array('files', 4), artController.addPhotos)
router.delete('/deletePhoto/:_id/:_imgID', artController.deletePhoto)

module.exports = router