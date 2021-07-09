const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
var enforce = require('express-sslify');
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override')
const connectDB = require('./config/database')
const path = require('path')
const homeRoutes = require('./routers/home')
const authRoutes = require('./routers/auth')
const artRoutes = require('./routers/art')
const blogRoutes = require('./routers/blog')
const PORT = 8000


require('dotenv').config({path: './config/.env'})

connectDB()

require('./config/passport')(passport)

console.log(__dirname)

app.set('view engine', 'ejs')
app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))

 
app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.DB_STRING})
    })
);

app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

app.use('/', homeRoutes)
app.use('/admin', authRoutes)
app.use('/art', artRoutes)
app.use('/blog', blogRoutes)

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server now running on ${PORT}`);
})