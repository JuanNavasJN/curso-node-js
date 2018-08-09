// Async Await

//Cuando se coloca async() este automaticamente retorna una promesa
// y con el await se maneja bien la promesa

// let getNOmbre = async() => {

//     throw new Error('No existe un nombre para ese usuario')
//     return 'Juan';
// }

let getNombre = () => {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve('Juan');
        }, 3000);

    })
}

let saludo = async() => {

    let nombre = await getNombre();

    return `Hola ${ nombre }`;
}

saludo().then(mensaje => {
    console.log(mensaje);
})