const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");

const ticketControl = new TicketControl();

io.on("connection", client => {
    client.on("siguienteTicket", (data, callback) => {
        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback(siguiente);
    });

    // Emitir un evento 'estadoActual'

    client.emit(
        "estadoActual",
        {
            actual: ticketControl.getUltimoTicket(),
            ultimos4: ticketControl.getUltimos4()
        },
        () => {
            console.log("El cliente recibio el estado actual");
        }
    );

    client.on("atenderTicket", (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                message: "El escritorio es necesario"
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        //console.log(atenderTicket);

        callback(atenderTicket);

        // actualizar notificar cambios en los ultimos 4
    });
});
