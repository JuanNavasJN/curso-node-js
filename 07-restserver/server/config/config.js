//========================
// Puerto
//=======================
process.env.PORT = process.env.PORT || 3000;

//=======================
// Entorno
//=======================

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

//=======================
// Base de datos
//=======================

let urlDB;

if (process.env.NODE_ENV === "dev") {
    urlDB = "mongodb://localhost:27017/cafe";
} else {
    urlDB =
        "mongodb+srv://root:juannavas97@cluster0-2dwds.mongodb.net/cafe?retryWrites=true";
}

process.env.URLDB = urlDB;

//=======================
// Vencimiento del token
//=======================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias

process.env.CADUCIDAD_TOKEN = "48h";

//=======================
// Seed de autenticacion
//=======================

process.env.SEED = process.env.SEED || "este-es-el-seed-dev";

//=====================
// Google Client
//===================

process.env.CLIENT_ID =
    process.env.CLIENT_ID ||
    "934049357004-ja1gc79qrodqu7v3opr97nliedieap90.apps.googleusercontent.com";
