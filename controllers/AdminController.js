const {Admin, Book, User, UserBook} = require('../models')
const getTime = require('../helper/getTime')

class AdminController{
    static showAdmin(req, res){
        Book.findAll()
            .then(data =>{
                let lastUpdate = []
                for(let i = 0; i < data.length;i++){
                    lastUpdate.push(getTime(data[i]))
                }
                res.render('bookAdmin', {dataBook: data, lastUpdate: lastUpdate, alert: req.query.message})
            })
            .catch(err =>{
                res.render('error', {error: err})
            })
    }

    static add(req, res){
        res.render('addBook', {alert: req.query.message})
    }

    static addPost(req, res){
        let newBook = {
            tittle: req.body.tittle,
            stock: req.body.stock
        }
        Book.create(newBook)
            .then(data =>{
                res.redirect('/admin/show?message=berhasil menambahkan buku')
            })
            .catch(err =>{
                let message = []
                if(Array.isArray(err.errors)){
                    
                    for(let i = 0 ; i < err.errors.length;i++){
                        message.push(err.errors[i].message)
                    }
                    res.redirect(`/admin/add?message="${message.join(',')}"`)
                }
                else{
                    res.render('error', {error:err})
                }  
            })
    }

    static update(req, res){
        let getId = req.params.id
        Book.findByPk(getId)
            .then(data =>{
                res.render('updateBook', {dataBook:data, alert: req.query.message})
            })
        
    }

    static updatePost(req, res){
        
        let getId = req.params.id
        let addStock = Number(req.body.stock)
        Book.findByPk(getId)
            .then(data =>{
                data.stock += addStock

                let newData = {
                    tittle: data.tittle,
                    stock: data.stock
                }
                return Book.update(newData,{
                    where:{
                        id: getId
                    },
                    returning: true
                })
            })

            .then(data =>{
                res.redirect('/admin/show?message=berhasil mengupdate buku')
            })
            .catch(err =>{
                let message = []
                if(Array.isArray(err.errors)){
                    
                    for(let i = 0 ; i < err.errors.length;i++){
                        message.push(err.errors[i].message)
                    }
                    res.redirect(`/admin/update/${getId}?message="${message.join(',')}"`)
                }
                else{
                    res.render('error', {error:err})
                }  
            })
    }

    static delete(req, res){
        const getId = req.params.id
        Book.destroy({where:{
            id:getId
            },
            returning: true})
        .then(data =>{
            res.redirect('/admin/empty?message=berhasil menghapus buku')
        })
    }


    static empty(req, res){
        Book.findAll()
        .then(data =>{
            let lastUpdate = []
                for(let i = 0; i < data.length;i++){
                    lastUpdate.push(getTime(data[i]))
                }
            res.render('emptyBook', {dataBook: data, lastUpdate: lastUpdate, alert: req.query.message})
        })
        .catch(err =>{
            res.render('error', {error: err})
        })
    }

    static showUser(req, res){
        
    }

}


module.exports = AdminController