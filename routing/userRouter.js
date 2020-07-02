const router =require('express').Router()
const UserController =require('../controllers/UserController')


router.get('/login', UserController.login)
router.post('/login', UserController.loginPost)
router.get('/register', UserController.register)
router.post('/register', UserController.registerPost)


module.exports = router