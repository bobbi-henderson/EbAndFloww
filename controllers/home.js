const Art = require('../models/Art')

module.exports = {
    getIndex: async (req, res) =>{
        try {
            const sold = await Art.find({sold: true})
            const avail = await Art.find({sold: false})
            res.render('index.ejs', {sold: sold, avail: avail, isLoggedIn: req.isAuthenticated()})
        } catch (err) {
            console.log(err)
        }
    }
}