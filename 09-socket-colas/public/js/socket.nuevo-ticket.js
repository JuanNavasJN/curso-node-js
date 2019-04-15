// Comando para establecer la conexion

const socket = io();

let label = $("#lblNuevoTicket");

socket.on("connect", () => {
    console.log("Conectado al servidor");
});

socket.on("disconnect", () => {
    console.log("Desconectado del servidor");
});

socket.on("estadoActual", (res, callback) => {
    label.text(res.actual);
    callback();
});

$("button").on("click", () => {
    socket.emit("siguienteTicket", null, siguienteTicket => {
        label.text(siguienteTicket);
    });
});
