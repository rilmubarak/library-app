const { Admin, Book, User, UserBook } = require('../models')
class AdminController{

    static login(req, res){
        res.render('loginAdmin', {alert: req.query.message})
    }

    static loginPost(req, res){
        let emailAdmin = req.body.email
        let passwordAdmin = req.body.password
        Admin.findAll()
            .then(data =>{
                for(let i = 0; i < data.length; i++){
                    if(data[i].email === emailAdmin && data[i].password === passwordAdmin){
                        console.log('succes login')
                    }
                    else{
                        console.log('email/password salah')
                    }
                }
            })
            .catch(err =>{
                res.render('error', {error:err})
            })
    }

    static register(req, res){
        res.render('registerAdmin', {alert: req.query.message})
    }

    static registerPost(req, res){
        let newAdmin = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }
        Admin.create(newAdmin)
            .then(data =>{
                res.redirect('/admins/login?message="Success Add"')
            })
            .catch(err =>{
                let message = []
                if(Array.isArray(err.errors)){
                    
                    for(let i = 0 ; i < err.errors.length;i++){
                        message.push(err.errors[i].message)
                    }
                }
                res.redirect(`/admins/register?message="${message.join(',')}"`)
            })
    }
}


module.exports = AdminController