module.exports = {
    getIndex: async (req, res) =>{
        try {
            res.render('index.ejs', {isLoggedIn: req.isAuthenticated()})
        } catch (err) {
            console.log(err)
        }
    }
}