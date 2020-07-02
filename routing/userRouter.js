const router = require('express').Router()
const UserController =require('../controllers/UserController')

router.get('/show', UserController.showUser)
router.get('/borrow/:id', UserController.borrow)
router.get('/return/:id', UserController.returningBook)

router.get('/', UserController.show)

router.post('/borrow', UserController.borrow)
router.get('/return/:id/:id1', UserController.return)

function loginAsUser(req, res, next) {
    if(req.session.userId && req.session.isAdmin === false){
        next()
    }else{
        res.redirect('/unauthorized')
    }
}

router.use(loginAsUser)


module.exports = router