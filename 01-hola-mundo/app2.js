function saludar(nombre) {
    let mensaje = `Hola ${ nombre }`;

    return mensaje;
}

let saludo = saludar('Juan Jose');

console.log(saludo);