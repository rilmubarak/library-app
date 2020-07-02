const router =require('express').Router()
const UserController =require('../controllers/UserController')


router.get('/login', UserController.login)
router.post('/login', UserController.loginPost)
router.get('/register', UserController.register)
router.post('/register', UserController.registerPost)

router.get('/show', UserController.showUser)
router.get('/borrow/:id', UserController.borrow)
router.get('/return/:id', UserController.returningBook)


module.exports = router