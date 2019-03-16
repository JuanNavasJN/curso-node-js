const express = require('express')
const User = require('../models/user')
const app = express()
const bcrypt = require('bcrypt')

app.get('/usuario', function (req, res) {
    res.json('get usuario')
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

    let id = req.params.id;

    res.json({
        id
    })
})

app.delete('/usuario', function (req, res) {
    res.json('delete usuario')
})

module.exports = app;