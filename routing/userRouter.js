const router = require('express').Router()
const UserController =require('../controllers/UserController')
let newData = []
function loginAsUser(req, res, next) {
    if(req.session.userId){
        next()
        
    }else{
        res.redirect('/unauthorized')
    }
}
router.get('/show', loginAsUser, UserController.showUser)
router.use(loginAsUser)
router.get('/borrow/:id', UserController.borrow)
router.get('/return/:id', UserController.returningBook)
router.get('/logout', UserController.logout)



module.exports = router