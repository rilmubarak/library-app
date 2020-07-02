const { Admin, User } = require('../models')
const bcrypt = require('bcryptjs')

class HomeController {
    static view (req, res){
        res.render('home')        
    }

    static notFound (req, res) {
        const err = 'Sorry, the page is not found'
        res.render('error', {err})
    }

    static unauthorized (req, res) {
        const err = 'Sorry, you are not allowed to access this page'
        res.render('error', {err})
    }

    static showSignUpUser (req, res) {
        res.render('registerUser')
    }

    static showSignInUser (req, res) {
        let msg = req.query
        res.render('loginUser', {msg})
    }

    static signInProcess (req, res) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(data => {
            if(!data || !(bcrypt.compareSync(req.body.password, data.password))){
                console.log('asdadsa')
                res.redirect('/user/show')
            }else{
                req.session.userId = data.id
                req.session.email = data.email
                req.session.username = data.name
                req.session.isAdmin = false
                res.redirect('/user')
            }
        })
        .catch(err => {
            res.send(err)
        })
    }

    static signUpProcess (req, res) {
        
        User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        })
        .then(
            res.redirect('/signin?msg=1')
        )
        .catch((err) => {
            res.redirect('/masuk')
        })
    }

    static showSignInAdmin (req, res) {
        let msg = req.query
        res.render('loginAdmin', {msg})
    }

    static signInAdminProcess (req, res) {
        Admin.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(data => {
            if(!data || req.body.password !== data.password){
                res.redirect('/signin?msg=2')
            } else {
                req.session.userId = data.id
                req.session.username = 'Admin'
                req.session.isAdmin = true
                res.redirect('/admin')
            }
        })
        .catch(err => {
            res.send(err)
        })
    }

    static signOut (req, res) {
        req.session.destroy()
        res.redirect('/')
    }
}


module.exports = HomeController