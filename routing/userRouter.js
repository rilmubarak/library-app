const router = require('express').Router()
const UserController =require('../controllers/UserController')

function loginAsUser(req, res, next) {
    if(req.session.userId && req.session.isAdmin === false){
        next()
    }else{
        res.redirect('/unauthorized')
    }
}

router.use(loginAsUser)

router.get('/', UserController.show)

router.post('/borrow', UserController.borrow)
router.get('/return/:id/:id1', UserController.return)

module.exports = router