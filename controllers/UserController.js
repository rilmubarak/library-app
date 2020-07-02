const {Admin, Book, User, UserBook} = require('../models')
const getTime = require('../helper/getTime')

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

    static showUser(req, res){
        Book.findAll()
            .then(data =>{
                let lastUpdate = []
                for(let i = 0; i < data.length;i++){
                    lastUpdate.push(getTime(data[i]))
                }
                res.render('bookUser', {dataBook: data, lastUpdate: lastUpdate, alert: req.query.message})
            })
            .catch(err =>{
                res.render('error', {error: err})
            })
    }

    static borrow(req, res){
        const getId = req.params.id
        Book.findByPk(getId)
            .then(data =>{
                data.stock -= 1

                let newData = {
                    tittle: data.tittle,
                    stock: data.stock
                }

                return Book.update(newData, {where:{
                    id: getId
                }, returning: true})
            })

            .then(data => {
                res.redirect('/user/show')
            })
            
            .catch(err =>{
                res.render('error', {error: err})
            })
    }

    static returningBook(req, res){
        const getId = req.params.id
        Book.findByPk(getId)
            .then(data =>{
                data.stock += 1

                let newData = {
                    tittle: data.tittle,
                    stock: data.stock
                }

                return Book.update(newData, {where:{
                    id: getId
                }, returning: true})
            })

            .then(data => {
                res.redirect('/user/show')
            })
            
            .catch(err =>{
                res.render('error', {error: err})
            })
    }
}


module.exports = UserController