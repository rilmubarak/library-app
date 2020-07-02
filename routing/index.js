const router = require('express').Router()
const adminRouter = require('./adminRouter')
const bookRouter = require('./bookRouter')
const userRouter= require('./userRouter')
const {HomeController} = require('../controllers/HomeController')

router.get('/', HomeController.view)

router.get('/signup', HomeController.showSignUpUser)
router.post('/signup', HomeController.signUpProcess)

router.get('/signin', HomeController.showSignInUser)
router.post('/signin', HomeController.signInProcess)

router.get('/signin-admin', HomeController.showSignInAdmin)
router.post('/signin-admin', HomeController.signInAdminProcess)

router.get('/signout', HomeController.signOut)

router.use('/admin', adminRouter)
router.use('/user', userRouter)
router.use('/book', bookRouter)

router.get('/unauthorized', HomeController.unauthorized)
router.get('/*', HomeController.notFound)


module.exports = router