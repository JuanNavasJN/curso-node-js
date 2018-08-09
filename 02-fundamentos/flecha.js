// function sumar(a, b) {
//     return a + b;
// }

// let sumar = (a, b) => {
//     return a + b;
// }

let sumar = (a, b) => a + b;

// function saludar() {
//     return 'Hola Mundo!';
// }

//let saludar = () => 'Hola Mundo!';

// function saludar(nombre) {
//     return `Hola ${nombre}`;
// }

// let saludar = (nombre) => {
//     return `Hola ${ nombre }`;
// }

//let saludar = (nombre) => `Hola ${ nombre }`;
//console.log(saludar('Juan'));
//console.log(sumar(10, 20));

let deadpool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'Regeneracion',
    getNombre() {
        return `${ this.nombre } ${ this.apellido } - poder: ${ this.poder }`
    }
};

console.log(deadpool.getNombre());