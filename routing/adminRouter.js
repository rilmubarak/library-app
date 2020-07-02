const router =require('express').Router()
const AdminController = require('../controllers/AdminController')

router.get('/show', AdminController.showAdmin)
router.get('/add', AdminController.add)
router.post('/add', AdminController.addPost)
router.get('/update/:id', AdminController.update)
router.post('/update/:id', AdminController.updatePost)
router.get('/delete/:id', AdminController.delete)
router.get('/empty', AdminController.empty)
router.get('/showUser/:id',  AdminController.showUser)


function loginAsAdmin(req, res, next) {
    if(req.session.userId && req.session.isAdmin){
        next()
    }else{
        res.redirect('/unauthorized')
    }
}

router.use(loginAsAdmin)




module.exports = router