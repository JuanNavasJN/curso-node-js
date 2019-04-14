const { io } = require("../server");

io.on("connection", client => {
    console.log("usuario conectado");

    client.emit("enviarMensaje", {
        user: "Admin",
        message: "Welcome to This Application"
    });

    client.on("disconnect", () => {
        console.log("Usuario desconectado");
    });

    // Escuchar el cliente
    client.on("enviarMensaje", (data, callback) => {
        console.log(data);

        client.broadcast.emit("enviarMensaje", data);

        // if (data.user) {
        //     callback({
        //         resp: "Todo salio bien!"
        //     });
        // } else {
        //     callback({
        //         resp: "Todo salio MAL!!!"
        //     });
        // }
    });
});
