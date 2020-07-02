const router =require('express').Router()
const AdminController = require('../controllers/AdminController')

function loginAsAdmin(req, res, next) {
    if(req.session.userId && req.session.isAdmin){
        next()
    }else{
        res.redirect('/unauthorized')
    }
}

router.use(loginAsAdmin)

router.get('/login', AdminController.login)
router.post('/login', AdminController.loginPost)
router.get('/register', AdminController.register)
router.post('/register', AdminController.registerPost)


module.exports = router