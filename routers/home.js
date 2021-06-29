const { Router } = require('express')
const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')

router.get('/', homeController.getIndex)
router.post('/sendContactForm', homeController.sendGeneralEmail)

module.exports = router