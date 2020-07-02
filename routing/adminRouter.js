const router =require('express').Router()
const AdminController = require('../controllers/AdminController')

function loginAsAdmin(req, res, next) {
    if(req.session.isAdmin){
        next()
    }else{
        res.redirect('/unauthorized')
    }
}
router.get('/show', loginAsAdmin, AdminController.showAdmin)

router.use(loginAsAdmin)
router.get('/add', AdminController.add)
router.post('/add', AdminController.addPost)
router.get('/update/:id', AdminController.update)
router.post('/update/:id', AdminController.updatePost)
router.get('/delete/:id', AdminController.delete)
router.get('/empty', AdminController.empty)
router.get('/logout', AdminController.logout)





router.use(loginAsAdmin)




module.exports = router