let socket = io();

// Escuchar
socket.on("connect", () => {
    console.log("conectado al servidor");
});

socket.on("disconnect", () => {
    console.log("Se perdio la conexion con el servidor");
});

// Enviar informacion
socket.emit(
    "enviarMensaje",
    {
        user: "Juan Navas",
        message: "Hello World, using Socket.io!"
    },
    resp => {
        console.log(resp);
    }
);

// Escuchar informacion
socket.on("enviarMensaje", data => {
    console.log("servidor: ", data);
});
