const express = require('express')

const { verifyToken } = require ('../middlewares/authentication')

const app = express()

const Category = require('../models/category')

app.get('/category', verifyToken, (req, res) => {

    Category.find({})
            .sort('description')
            .populate('user', 'name email')
            .exec((err, categories) => {

                if(err){
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }
      
                Category.countDocuments({}, (err, cant) => {
                    res.json({
                        ok: true,
                        categories,
                        items: cant
                    })
                })
            })
})

app.get('/category/:id', verifyToken, (req, res) => {

    const id = req.params.id

    Category.findById(id, (err, categoryDB) => {

        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            category: categoryDB
        })
    })
})

app.post('/category', verifyToken, (req, res) => {

    const body = req.body

    const category = new Category({
        description: body.description,
        user: req.user._id
    })

    category.save( (err, categoryDB) => {

        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            categoryDB
        })
        
    })
})

app.put('/category/:id', verifyToken, (req, res) => {

    const id = req.params.id
    const body = req.body

    Category.findByIdAndUpdate( id, {description: body.description}, { new: true, runValidators: true}, (err, categoryDB) => {

        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            category: categoryDB
        })
    })
})

app.delete('/category/:id', verifyToken, (req, res) => {

    const id = req.params.id

    if(req.user.role !== 'ADMIN_ROLE'){
        return res.json({
            ok: false,
            error: {
                message: 'No eres usuario administrador'
            }
        })
    }
    Category.findByIdAndRemove(id, (err, categoryDeleted) => {

        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if(!categoryDeleted){
            return res.json({
                        ok: false,
                        error: {
                            message: 'Categoria no encontrada'
                        }
                    })
        }

        res.json({
            ok: true,
            category: categoryDeleted
        })
        
    })
})


module.exports = app;