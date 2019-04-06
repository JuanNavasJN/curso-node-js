const express = require('express')

const { verifyToken } = require ('../middlewares/authentication')

const app = express()

const Product = require('../models/product')

// Obtener todos los productos
app.get('/products', (req, res) => {

    //trae todos los productos
    //populate: usuario categoria
    //paginado
})

// Obtener un producto por un id
app.get('/products/:id', (req, res) => {

    //populate: user category

})

// Crear un nuevo producto

app.post('/products', (req, res) => {
    //grabar el usuario
    //grabar una categoria del listado
})

// Actualizar producto
app.put('/product/:id', (req, res) => {

})

//Borrar producto
app.delete('/product/:id', (req, res) => {
    
    // solo cambiar disponibilidad
})


module.exports = app