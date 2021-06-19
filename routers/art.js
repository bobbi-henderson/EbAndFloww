const { Router } = require('express')
const express = require('express')
const router = express.Router()
const artController = require('../controllers/art')

router.get('/addArt', artController.getAddArtForm)

module.exports = router