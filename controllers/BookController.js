const {Admin, Book, User, UserBook} = require('../models')
const getTime = require('../helper/getTime')
class BookController{
       static show(req, res){
        Book.findAll()
        .then(data =>{
            let lastUpdate = []
            for(let i = 0; i < data.length;i++){
                lastUpdate.push(getTime(data[i]))
            }
            res.render('showBook', {dataBook: data, lastUpdate: lastUpdate, alert: req.query.message})
        })
        .catch(err =>{
            res.render('error', {error: err})
        })
       }
}

module.exports  = BookController