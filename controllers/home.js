const Art = require('../models/Art')
const mailer = require('../middleware/nodeMailer')

const isArtOrAuth = false
const isBlog = false

module.exports = {
    getIndex: async (req, res, next) =>{
        try {
            if(req.headers['x-forward-proto']!='https']){
                res.redirect('https://www.ebandfloww.art/'+req.url)
            } else {
                next()
            }
            
            const sold = await Art.find({sold: true})
            const avail = await Art.find({sold: false})
            res.render('index.ejs', {sold: sold, avail: avail, isLoggedIn: req.isAuthenticated(), isArtOrAuth: isArtOrAuth, isBlog: isBlog})
        } catch (err) {
            console.log(err)
        }
    }, 
    sendGeneralEmail: async (req, res) =>{
        try {
            const name = req.body.name
            const email = req.body.email
            const subject = req.body.subject
            const message = req.body.message
            

            const info = await mailer.sendMail({
                to: `${process.env.Email}, ${email}`,
                subject: `${subject}`,
                html: `<h3>${name} asked a question!</h3>
                        <p>${message}</p>`
            })

            res.redirect('back')
        } catch(err) {
            console.log(err)
        }
    }
}