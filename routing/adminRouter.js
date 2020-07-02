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


module.exports = router