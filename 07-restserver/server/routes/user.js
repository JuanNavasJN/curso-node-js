const express = require('express')
const User = require('../models/user')
const app = express()
const bcrypt = require('bcrypt')
const _ = require('underscore')

app.get('/usuario', function (req, res) {

    let from = req.query.from || 0
    from = Number(from)

    let limit = req.query.limit || 5
    limit = Number(limit)

    User.find({state: true}, 'name email role state google img')
        .skip(from)
        .limit(limit)
        .exec( (err, users) => {

            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
  
            User.count({state: true}, (err, cant) => {
                res.json({
                    ok: true,
                    users,
                    items: cant
                })
            })
        })
})

app.post('/usuario', function (req, res) {

    let body = req.body

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    user.save( (err, userDB) => {

        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            user: userDB
        })
        
    })

})

app.put('/usuario/:id', function (req, res) {

    let id = req.params.id
    let body = _.pick( req.body, ['name', 'email', 'img', 'role', 'state'] )

    User.findByIdAndUpdate( id, body, { new: true, runValidators: true}, (err, userDB) => {

        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            user: userDB
        })
    })

})

app.delete('/usuario/:id', function (req, res) {

    let id = req.params.id
 
    // Borrando de base datos
    // User.findByIdAndRemove(id, (err, userDeleted) => {

    //     if(err){
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         })
    //     }

    //     if(!userDeleted){
    //         res.json({
    //             ok: false,
    //             error: {
    //                 message: 'Usuario no encontrado'
    //             }
    //         })
    //     }

    //     res.json({
    //         ok: true,
    //         user: userDeleted
    //     })
        
    // })

    // Cambiando estado

    User.findByIdAndUpdate( id, {state: false}, { new: true, runValidators: true}, (err, userDB) => {

        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }else if(!userDB){
            res.json({
                ok: false,
                error: {
                    message: 'Usuario no encontrado'
                }
            })
        }

        res.json({
            ok: true,
            user: userDB
        })
    })

})

module.exports = app;