const socket = io();

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
    window.location = "index.html";
    throw new Error("El escritorio es necesario");
}

const escritorio = searchParams.get("escritorio");
const small = $("small");

$("h1").text("Escritorio " + escritorio);

$("button").on("click", () => {
    socket.emit("atenderTicket", { escritorio }, res => {
        if (res === "No hay Tickets") {
            alert(res);
            small.text(res);
            return;
        }
        small.text("Ticket " + res.numero);
    });
});
