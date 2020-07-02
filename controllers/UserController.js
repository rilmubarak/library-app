require('dotenv').config()
const {Admin, Book, User, UserBook} = require('../models')
const {HomeController, databaru} = require('./HomeController')
const getTime = require('../helper/getTime')
const nodemailer = require('nodemailer')

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
        let input
        User.findAll()
            .then(data =>{

                for(let i = 0; i < data.length;i++){
                    if(data[i].id === req.session.userId){
                        input = data[i].fullName
                    }
                }
                return  Book.findAll()
            })
            .then(data =>{
                let lastUpdate = []
                for(let i = 0; i < data.length;i++){
                    lastUpdate.push(getTime(data[i]))
                }
                res.render('bookUser', {dataBook: data, nama:input, lastUpdate: lastUpdate, alert: req.query.message})
            })
            .catch(err =>{
                res.render('error', {error: err})
            })
    }

    static borrow(req, res){
        
        const idSession = req.session.userId
        const getId = Number(req.params.id)
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
                
                let newData = {
                    BookId: getId,
                    UserId: idSession
                }
                return UserBook.create(newData)
            })
            .then(data =>{
                let transporter = nodemailer.createTransport({
                    service:'gmail',
                    auth:{
                        user: process.env.PASSWORD,
                        pass: process.env.EMAIL
                    }
                })
                let mailOptions = {
                    from: "asdas",
                    to: req.session.email,
                    subject: "Borrowing book from library",
                    text: `success borrowing book ${data.tittle}`
                }
        
                transporter.sendMail(mailOptions, function(err, data){
                    if(err){
                        console.log('rorrrr')
                    }
                    else{
                        console.log('asdas')
                    }
                })
                res.redirect('/user/show')
            })
            
            .catch(err =>{
                res.render('error', {error: err})
            })
    }

    static returningBook(req, res){
        const idSession = req.session.userId
        const getId = Number(req.params.id)
        let idData
        UserBook.findAll()
            .then(data =>{
                let result = []
                for(let i = 0; i < data.length;i++){
                    if(data[i].UserId === idSession && data[i].BookId === getId){
                        idData = data[i].id
                        result.push(data[i].UserId)
                    }
                }
                if(result.length === 0){
                    res.redirect('/user/show?message=anda belum meminjam buku ini')
                }
                else{
                    return Book.findByPk(getId)
                }
            })
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
                return UserBook.destroy({
                    where:{
                        id: idData
                    },
                    returning:true
                })
               
            })

            .then(data=>{
                let transporter = nodemailer.createTransport({
                    service:'gmail',
                    auth:{
                        user: process.env.PASSWORD,
                        pass: process.env.EMAIL
                    }
                })
                let mailOptions = {
                    from: "asdas",
                    to: req.session.email,
                    subject: "Returning book from library",
                    text: `success returning book ${data.tittle}`
                }
        
                transporter.sendMail(mailOptions, function(err, data){
                    if(err){
                        console.log('rorrrr')
                    }
                    else{
                        console.log('asdas')
                    }
                })
                res.redirect('/user/show')
            })
            
            .catch(err =>{
                res.render('error', {error: err})
            })
    }

    static logout(req, res){
        req.session.destroy(function(err){
            if(err){
                res.send(err)
            }
            else{
                res.redirect('/')
            }
        })
    }
}


module.exports = UserController