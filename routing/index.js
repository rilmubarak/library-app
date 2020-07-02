const router = require('express').Router()
const adminRouter = require('./adminRouter')
const bookRouter = require('./bookRouter')
const userRouter= require('./userRouter')
const HomeController = require('../controllers/HomeController')

router.get('/', HomeController.view)

router.use('/admins', adminRouter)
router.use('/books', bookRouter)
router.use('/users', userRouter)


module.exports = router