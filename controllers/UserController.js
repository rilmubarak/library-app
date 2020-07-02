const {Admin, Book, User, UserBook} = require('../models')
class UserController{
    static login(req, res){
        res.render('loginUser')
    }
    static loginPost(req, res){
        let emailUser = req.body.email
        let passwordUser = req.body.password
        User.findAll()
            .then(data =>{
                for(let i = 0; i < data.length; i++){
                    if(data[i].email === emailUser && data[i].password === passwordUser){
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
        res.render('registerUser', {alert: req.query.message})
    }

    static registerPost(req, res){
        let newUser = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
            .then(data =>{
                res.redirect('/users/login?message="Success Add"')
            })
            .catch(err =>{
                let message = []
                if(Array.isArray(err.errors)){
                    
                    for(let i = 0 ; i < err.errors.length;i++){
                        message.push(err.errors[i].message)
                    }
                }
                res.redirect(`/users/register?message="${message.join(',')}"`)
            })
    }
}


module.exports = UserController