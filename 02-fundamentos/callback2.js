let empleados = [{
    id: 1,
    nombre: 'Juan'
}, {
    id: 2,
    nombre: 'Fiorella'
}, {
    id: 3,
    nombre: 'Daniela'
}];

let salarios = [{
    id: 1,
    salario: 1000
}, {
    id: 2,
    salario: 2000
}];

let getEmpleado = (id, callback) => {

    let empleadoDB = empleados.find(empleado => empleado.id === id);

    if (!empleadoDB) {
        callback(`No existe un empleado con el ID ${ id }`);
    } else {
        callback(null, empleadoDB);
    }
}

let getSalario = (empleado, callback) => {
    let salarioDB = salarios.find(salario => empleado.id === salario.id);

    if (!salarioDB) {
        callback(`No se encontro un salario para el empleado ${ empleado.nombre }`);
    } else {
        callback(null, {
            nombre: empleado.nombre,
            salario: salarioDB.salario
        });
    }
}

// getSalario(empleados[2], (err, salario) => {
//     if (err) {
//         return console.log(err);
//     }
//     console.log(salario);
// });

getEmpleado(3, (err, empleado) => {

    if (err) {
        return console.log(err);
    }

    getSalario(empleado, (err, res) => {
        if (err) {
            return console.log(err);
        }
        console.log(`El salario de ${res.nombre} es de ${ res.salario }$`);
    });
})