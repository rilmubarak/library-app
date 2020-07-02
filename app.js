const express = require('express')
const router = require('./routing')

const app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(router)


app.listen(PORT, function(){
    console.log(`NOW RUNNING ON PORT ${PORT}`)
})

