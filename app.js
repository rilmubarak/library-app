const express = require('express')
const router = require('./routing')
const session = require('express-session')

const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(session({
    secret: 'asdasdadsaxxx',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
app.use(express.urlencoded({extended: false}))
app.use(router)


app.listen(PORT, function(){
    console.log(`NOW RUNNING ON PORT ${PORT}`)
})

