require("./config/config");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Configuracion global de rutas
app.use(require("./routes/index"));

// Habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, "../public")));

mongoose.connect(
    process.env.URLDB,
    { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {
        if (err) throw err;

        console.log("Base de datos ONLINE");
    }
);

app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto: ", process.env.PORT);
});
