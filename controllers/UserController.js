const {Admin, Book, User, UserBook} = require('../models')

class UserController{
    static show(req, res){
        res.render('Show Dasboard')
    }

    static borrow(req, res){
        res.render('Show Dasboard')
    }

    static return(req, res){
        res.render('Show Dasboard')
    }
}


module.exports = UserController