const express = require("express");

const { verifyToken } = require("../middlewares/authentication");
const _ = require("underscore");

const app = express();

const Product = require("../models/product");
const Category = require("../models/category");

// Obtener todos los productos
app.get("/products", (req, res) => {
    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 5;
    limit = Number(limit);

    Product.find({})
        .skip(from)
        .limit(limit)
        .populate("user", "name email")
        .populate("category", "description")
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Product.countDocuments({}, (err, cant) => {
                res.json({
                    ok: true,
                    products,
                    items: cant
                });
            });
        });
});

// Obtener un producto por un id
app.get("/product/:id", (req, res) => {
    const id = req.params.id;

    Product.findById(id)
        .populate("user", "name email")
        .populate("category", "description")
        .exec((err, productDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                product: productDB
            });
        });
});

// Buscar producto

app.get("/product/find/:term", verifyToken, (req, res) => {
    const term = req.params.term;

    const regex = new RegExp(term, "i");

    Product.find({ name: regex })
        .populate("category", "description")
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                products
            });
        });
});

// Crear un nuevo producto

app.post("/product", verifyToken, (req, res) => {
    const body = req.body;

    Category.findOne({ description: body.category }).exec((err, category) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (category) {
            const product = new Product({
                name: body.name,
                priceUni: body.priceUni,
                description: body.description,
                available: body.available,
                category: category._id,
                user: req.user._id
            });

            product.save((err, productDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    productDB
                });
            });
        } else {
            res.status(400).json({
                ok: false,
                message: "No existe la categoria"
            });
        }
    });
});

// Actualizar producto
app.put("/product/:id", verifyToken, (req, res) => {
    const id = req.params.id;

    const body = _.pick(req.body, [
        "name",
        "priceUni",
        "description",
        "available"
    ]);

    Product.findByIdAndUpdate(
        id,
        body,
        { new: true, runValidators: true },
        (err, productDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                product: productDB
            });
        }
    );
});

//Borrar producto
app.delete("/product/:id", verifyToken, (req, res) => {
    const id = req.params.id;

    if (req.user.role !== "ADMIN_ROLE") {
        return res.json({
            ok: false,
            error: {
                message: "No eres usuario administrador"
            }
        });
    }

    Product.findByIdAndUpdate(
        id,
        { available: false },
        { new: true, runValidators: true },
        (err, productDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                product: productDB
            });
        }
    );
});

module.exports = app;
