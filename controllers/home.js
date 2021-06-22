const Art = require('../models/Art')

const isArtOrAuth = false
const isBlog = false

module.exports = {
    getIndex: async (req, res) =>{
        try {
            const sold = await Art.find({sold: true})
            const avail = await Art.find({sold: false})
            res.render('index.ejs', {sold: sold, avail: avail, isLoggedIn: req.isAuthenticated(), isArtOrAuth: isArtOrAuth, isBlog: isBlog})
        } catch (err) {
            console.log(err)
        }
    }
}